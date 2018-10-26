import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import {Modal, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { API_URL_1 } from '../supports/api-url/apiurl';

const cookies = new Cookies();

class CheckoutPage extends Component {
    
    state= { GrandTotal:0, cart:'', show:false, addAddress:true, transDetails:'', GrandTotal: 0 }

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
            return  <tr>
                        <td><h4>Your</h4></td>
                        <td><h4>Cart</h4></td>
                        <td><h4>is</h4></td>
                        <td><h4>Empty</h4></td>
                        <td></td>
                    </tr>
        }
        return this.state.cart.map(cart=>{
            return(
                <tr>
                    <td style={{textAlign:"center"}}>{cart.ProductName}</td>
                    <td style={{textAlign:"center"}}>Rp.{parseInt(cart.ProductPrice).toLocaleString('id')}</td>
                    <td style={{textAlign:"center"}}>{cart.amount} piece(s)</td>
                    <td style={{textAlign:"center"}}>Rp.{parseInt(cart.ProductPrice * cart.amount).toLocaleString('id')}</td>
                    <td><button onClick={()=>{this.deleteItem(cart.idcart)}} >Delete</button></td>
                </tr>
            )
        })
    }

    renderGrandTotal=()=>{
        var GrandTotal = 0;
        if(this.state.cart == ''){
            return <h4> </h4>
        }
        this.state.cart.map(cart=>{
            GrandTotal += cart.ProductPrice * cart.amount
        })
        return  GrandTotal 
    }

    checkoutFunc = () => {
        console.log(this.renderGrandTotal())
        var data =  [{
                        address: this.refs.addressDetail.value, 
                        TransactionValue: this.renderGrandTotal(),
                        DeliveryMethod: this.refs.delivery.value,
                        Payment: this.refs.payment.value }, 
                        this.state.cart ];
        if(this.state.cart !== ''){
            Axios.post(API_URL_1 + 'checkout', data)
                .then(ok=>{
                console.log(ok)
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

    onAddressRadio=()=>{
        this.setState({ addAddress: !this.state.addAddress })
    }
    render(){
        // if(this.state.cart == ''){
        //     return <div><br/><br/><br/><br/><h4>Your Cart is Empty</h4></div>
        // }
        return(
             <div>
                 <br/>
                 <br/>
                 <br/>
                 <br/>
                 <h4>1. Konfirmasi Pesanan Anda</h4>
                 
                 <table style={{ margin: 'auto' }} className='tftable'>
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
                        <th ref='grandTotal' style={{textAlign:"center"}}>{this.renderGrandTotal()}</th>
                    </tfoot>
                </table>

                <h4>2. Konfirmasi Alamat Pengantaran Anda</h4>
                <div>
                    <span>
                        <input type='radio' name='address' value='1' onChange= {() => {this.onAddressRadio(), this.refs.addressDetail.value = ''}} defaultChecked/> Sesuai profil
                        <input type='radio' name='address' value='2' onChange= {this.onAddressRadio}/> Alamat Baru :
                    </span>
                    <div>
                        <input ref='addressDetail' type='text' disabled={this.state.addAddress} />
                    </div>
                </div>
                <h4>3. Konfirmasi Metode Pengiriman Anda</h4>
                <span >
                    <input ref='delivery' type='radio' name='delivery' value='JNE' /> JNE <br/>
                    <input ref='delivery' type='radio' name='delivery' value='TIKI' /> TIKI<br/>
                    <input ref='delivery' type='radio' name='delivery' value='Go-Jek' checked /> Go-Jek <br/>
                </span>
                <br/><br/>
                <h4>4. Konfirmasi Metode Pembayaran Anda</h4>
                <span >
                    <input ref='payment' type='radio' name='payment' value='COD' /> COD <br/>
                    <input ref='payment' type='radio' name='payment' value='Credit' /> Credit<br/>
                    <input ref='payment' type='radio' name='payment' value='Bank Transfer' checked /> Bank Transfer<br/>
                </span>
                <br/><br/>
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
