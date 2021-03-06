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
        })
    }

    renderCart = () => {
        if(this.state.cart == ''){
            return  <tr>
                        <td><h4>Your</h4></td>
                        <td><h4>Cart</h4></td>
                        <td><h4>is</h4></td>
                        <td><h4>Empty</h4></td>
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
        var address = () => {
            if(this.refs.addressDetail.value == ''){
                return this.props.auth.address
            }else {
                return this.refs.addressDetail.value
            }
        }
        var data =  [{
                        address: address(), 
                        TransactionValue: this.renderGrandTotal(),
                        DeliveryMethod: document.forms.delivery.delivery.value,
                        Payment: document.forms.payment.payment.value }, 
                        this.state.cart ];
        if(this.state.cart !== ''){
            Axios.post(API_URL_1 + 'checkout', data)
                .then(ok=>{
                console.log(ok)
                }).catch(err=>{
                console.log(err)
            })
        }else {
            return alert('Cart Anda Kosong')
        }
    }

    deleteItem=(id)=>{
        const { username } = this.props.auth
        console.log(username)
        Axios.delete(API_URL_1 + 'cart', {
            params: {
                id: id,
                username: username
            }
        }).then(ok=>{
            console.log(ok.data)
            this.setState({cart: ok.data})
        }).catch(err=>{
            console.log(err);
        })
    }

    handleShow =()=> {
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
                <form name='delivery'>
                    <input  type='radio' name='delivery' value='JNE' defaultChecked/> JNE <br/>
                    <input  type='radio' name='delivery' value='TIKI' /> TIKI<br/>
                    <input  type='radio' name='delivery' value='Go-Jek' /> Go-Jek <br/>
                </form>
                <br/><br/>
                <h4>4. Konfirmasi Metode Pembayaran Anda</h4>
                <form name='payment' >
                    <input  type='radio' name='payment' value='COD' defaultChecked/> COD <br/>
                    <input  type='radio' name='payment' value='Credit' /> Credit<br/>
                    <input  type='radio' name='payment' value='Bank Transfer' /> Bank Transfer<br/>
                </form>
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
    return { auth };
}

export default connect(mapStateToProps)(CheckoutPage);
