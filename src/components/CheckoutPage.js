import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import {Modal, Button} from 'react-bootstrap';

const cookies = new Cookies();

class CheckoutPage extends Component {
    
    state= {GrandTotal:0, cart:'', show:false}

    componentWillMount(){
        this.getCart()
    } 

    getCart(){
        const cookieNya = cookies.get('LoggedInUser');
        Axios.get(`http://localhost:1002/cart/${cookieNya}`)
        .then(ok=>{
            if(ok.data.length >0){
                this.setState({cart: ok.data})
            }
        // console.log(ok.data)
        })
    }

    renderCart = () => {
        if(this.state.cart == ''){
            return <h4>Your Cart is Empty</h4>
        }
        return this.state.cart.map(cart=>{
            return(
                <tr>
                    <th>{cart.ProductName}</th>
                    <th>{cart.ProductPrice}</th>
                    <th>{cart.amount}</th>
                    <th>{cart.ProductPrice * cart.amount}</th>
                    <th><button onClick={()=>{this.deleteItem(cart.idcart)}} >Delete</button></th>
                </tr>
            )
        })
    }

    renderGrandTotal=()=>{
        console.log(this.props.auth.username)
        var GrandTotal = 0;
        if(this.state.cart == ''){
            return <h4>Loading ...</h4>
        }
        this.state.cart.map(cart=>{
            GrandTotal += cart.ProductPrice * cart.amount
        })
        return GrandTotal;
    }

    checkoutFunc = () => {
        console.log(this.state.cart)
        if(this.state.cart !== ''){
            Axios.post('http://localhost:1002/checkout', this.state.cart)
                .then(ok=>{
                console.log(ok)
                // Cart should be emptied and user should be redirected somewhere else idk
                }).catch(err=>{
                console.log(err)
            })
        }
    }

    deleteItem=(id)=>{
        console.log(id)
        Axios.delete('http://localhost:1002/cart/' + id)
        .then(ok=>{
            this.setState({cart: ok.data})
        }).catch(err=>{
            console.log(err);
        })
    }

    handleShow =()=> {
        console.log('hendelsow berjalan')
        this.setState({ show: true });
    }

    handleClose=()=>{
        this.setState({ show: false });
    }

    checkoutBtn=()=>{
        this.handleShow()
        this.checkoutFunc()
        this.getCart()
    }
    render(){
         return(
             <div>
                 <br/>
                 <br/>
                 <br/>
                 <br/>
                 <table>
                    <thead>
                        <tr>
                            <th>ProductName</th>
                            <th>Price</th>
                            <th>Amount</th>
                            <th>Total Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderCart()}
                    </tbody>
                    <tfoot>
                        <th>GrandTotal</th>
                        <th></th>
                        <th></th>
                        <th>{this.renderGrandTotal()}</th>
                    </tfoot>
                </table>
                <input type='button' onClick={this.checkoutBtn} value='Checkout'/>
             
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <h3>Terimakasih Telah Berbelanja di Xiao Mai</h3>
                    <Modal.Footer>
                        <Button href='/'>Kembali ke Halaman Utama</Button>
                    </Modal.Footer>
                </Modal>

             </div>

         )
     }
}

const mapStateToProps = (state) => {
    const auth = state.auth;
    // const selectedProduct = state.selectedProduct;
    return { auth };
}

export default connect(mapStateToProps)(CheckoutPage);
