import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';

class CheckoutPage extends Component {
    
    state= {GrandTotal:0, cart:''}

    componentWillMount(){
        this.getCart()
    }

    getCart(){
        Axios.get('http://localhost:1002/cart')
        .then(ok=>{
            this.setState({cart: ok.data})
            console.log(ok.data)
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
        var GrandTotal = 0;
        if(this.state.cart == ''){
            return <h4>Loading ...</h4>
        }
        this.state.cart.map(cart=>{
            GrandTotal += cart.ProductPrice * cart.amount
        })
        return GrandTotal;
    }

    // Need add multiple data into transhistory table
    checkoutFunc = () => {
        const {idcart, ProductName, ProductPrice, amount} = this.state.cart
        console.log(this.state.cart)
        var GrandTotal = 0;
        this.state.cart.map(cart=>{
            GrandTotal += cart.ProductPrice * cart.amount
        })
        var username = 'a'
        // console.log(GrandTotal)
        Axios.get('http://localhost:1002/checkout' + username, this.state.cart)
        .then(ok=>{
            console.log(ok)
            // Cart should be emptied and user should be redirected somewhere else idk
        }).catch(err=>{
            console.log(err)
        })
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
                <input type='button' onClick={this.checkoutFunc} value='Checkout'/>
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
