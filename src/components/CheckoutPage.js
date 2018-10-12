import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import {Modal, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { API_URL_1 } from '../supports/api-url/apiurl';

const cookies = new Cookies();

class CheckoutPage extends Component {
    
    state= {GrandTotal:0, cart:'', show:false}

    componentWillMount(){
        this.getCart()
    } 

    getCart(){
        const cookieNya = cookies.get('LoggedInUser');
        Axios.get(API_URL_1 + `cart/${cookieNya}`)
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
                    <td style={{textAlign:"center"}}>{cart.ProductName}</td>
                    <td style={{textAlign:"center"}}>{cart.ProductPrice}</td>
                    <td style={{textAlign:"center"}}>{cart.amount}</td>
                    <td style={{textAlign:"center"}}>{cart.ProductPrice * cart.amount}</td>
                    <td><button onClick={()=>{this.deleteItem(cart.idcart)}} >Delete</button></td>
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
            Axios.post(API_URL_1 + 'checkout', this.state.cart)
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
        Axios.delete(API_URL_1 + 'cart/' + id)
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
                 <table className='container'>
                    <thead>
                        <tr>
                            <th style={{textAlign:"center"}}>ProductName</th>
                            <th style={{textAlign:"center"}}>Price</th>
                            <th style={{textAlign:"center"}}>Amount</th>
                            <th style={{textAlign:"center"}}>Total Price</th>
                            <th style={{textAlign:"center"}}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderCart()}
                    </tbody>
                    <tfoot>
                        <th style={{textAlign:"center"}}>GrandTotal</th>
                        <th style={{textAlign:"center"}}></th>
                        <th style={{textAlign:"center"}}></th>
                        <th style={{textAlign:"center"}}>{this.renderGrandTotal()}</th>
                    </tfoot>
                </table>
                <input type='button' onClick={this.checkoutBtn} value='Checkout'/>
             
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <h3>Terimakasih Telah Berbelanja di Xiao Mai</h3>
                    <Modal.Footer>
                        <Button >
                            <Link to='/'>Kembali ke Halaman Utama</Link>
                        </Button>
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
