import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import XPS15 from '../supports/img/XPS 15 - 1.jpg';
import Cookies from 'universal-cookie';
import {Image, Col, Button, Modal} from 'react-bootstrap';
import Axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl';
import { addToCart } from '../actions';

const cookies = new Cookies();

// Add to cart is yet to be protected
// Need to fix routing method
// Check for bugs pls

class ProductDetails extends Component {
    state = {product: null, amount: 1, show: false, cart: ''}

    componentWillMount(){
        this.getSelectedProduct()
    }
    getSelectedProduct(){
        var selected = cookies.get('SelectedProduct')
        Axios.get('http://localhost:1002/products/' + selected)
        .then(ok=>{
            // console.log(ok.data)
            this.setState({product:ok.data})
            // console.log(this.state.product[0].ProductName)
        })
    }
    renderContent(){
        console.log(this.state.product)
        if(this.state.product.length >= 0 ){
            const {ProductName, ProductPrice, Description, Brand, Color, ScreenSize, RAM, Storage, Stock} = this.state.product[0]
            return([
                ProductName,
                ProductPrice,
                Description, 
                Brand, 
                Color, 
                ScreenSize, 
                RAM, 
                Storage, 
                Stock
            ])
        }
    }
    addToCart=()=>{
        const {idproducts, ProductName, ProductPrice} = this.state.product[0]
        const amount = this.refs.amount.value
        
        if(this.refs.amount.value < 1){
            window.alert('Jumlah Item Harus Lebih dari 0')
        }
        Axios.post('http://localhost:1002/cart', {
            idproducts, 
            ProductName, 
            ProductPrice, 
            amount
        }).then(ok=>{
            this.setState({cart: ok.data})
        }).catch(err=>{
            console.log(err)
        })
    }

    renderStock=()=>{
        const Stock = [];
        for(var i=1; i<=this.state.product[0].Stock; i++){
            console.log(i)
                Stock.push(<option value={i}>{i}</option>)
        }
       return(Stock)
    }

    renderTotal=()=>{
        return this.state.product[0].ProductPrice * this.state.amount;
    }
    changeAmount=()=>{
        this.setState({amount: this.refs.amount.value})
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleClose=()=>{
        this.setState({ show: false });
    }

    onBuyBtnClick=()=>{
        // console.log(this.props.auth)
        // if(this.props.auth.username == ''){
        //     console.log('you should be redirected')
        //     return <Redirect to='/login'/>
        // }
        this.handleShow()
        this.addToCart(this.state.product[0].idproducts)
    }
    
    renderCart = () => {
        if(this.state.cart == ''){
            return <h4>Your Cart is Empty</h4>
        }
        console.log(this.state.cart)
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

    deleteItem=(id)=>{
        console.log(id)
        Axios.delete('http://localhost:1002/cart/' + id)
        .then(ok=>{
            this.setState({cart: ok.data})
        }).catch(err=>{
            console.log(err);
        })
    }

    renderGrandTotal=()=>{
        var GrandTotal = 0;
        if(this.state.cart == ''){
            return <h4>Loading ...</h4>
        }
        this.state.cart.map(cart=>{
            GrandTotal += cart.ProductPrice * cart.amount
        })
        return GrandTotal;
    }

    checkout(){
        // insert redirecting function here
    }

    render(){
        if (this.state.product === null) {
            return(
                <div>
                    <br/>
                    <br/>
                    <br/>
                    <h3>Please Wait</h3>
                </div>
                
            )
        }
        
        return(
            <div >
                <h3>
                    <br/>
                    <br/>
                    <br/>
                    {this.state.product[0].ProductName}
                </h3>
                <Col className="container container-fluid" xs={12} >
                     <Image src={XPS15} responsive />
                </Col>

                <div>
                    {this.state.product[0].Description}
                </div>

                <br/>
                <br/>

                <div>
                    Available Stock : {this.state.product[0].Stock}
                </div>
                <div>
                    Rp. {this.state.product[0].ProductPrice} x {' '}
                    <select onChange={this.changeAmount} ref='amount'>
                        {this.renderStock()}
                    </select>     
                </div>
                 
                 <div>
                     Total Price : Rp. {this.renderTotal()}
                 </div>

                <Button onClick={ this.onBuyBtnClick } bsStyle="primary">Add to Cart</Button>
                {/* <Button onClick={ () => console.log(this.state.amount)} bsStyle="primary"> Check</Button> */}

                <br/>
                <br/>
                <div>

                </div>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Your Cart</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.checkout}>Checkout</Button>
                        <Button onClick={this.handleClose}>Continue Shopping</Button>
                    </Modal.Footer>
                    </Modal>
            </div>
        )
        
       
        // return(
        //     <div >
        //         <br/>
        //         <br/>
        //         <br/>

        //         {/* <h3>{this.renderContent()}</h3> */}

        //         <Col className="container container-fluid" xs={12} >
        //             <Image src={XPS15} responsive />
        //         </Col>

        //         <Col xsHidden xs={2} />
        //         <p className='col col-xs-8'>
        //             Lorem ipsum dolor sit amet consectectur adipiscing 
        //             Lorem ipsum dolor sit amet consectectur adipiscing
        //             Lorem ipsum dolor sit amet consectectur adipiscing
        //             Lorem ipsum dolor sit amet consectectur adipiscing
        //             Lorem ipsum dolor sit amet consectectur adipiscing
        //         </p>

        //         <Col xsHidden xs={5} />
        //         <Button onClick={ () => this.addToCart(this.state.product[0].idproducts)} className='col-xs-2' bsStyle="primary">Buy Now</Button>
        //         <Col xsHidden xs={5} />

        //     </div>
        // )
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;
    const selectedProduct = state.selectedProduct;
    return { auth, selectedProduct };
}

export default connect(mapStateToProps, addToCart)(ProductDetails);
// export default ProductDetails;