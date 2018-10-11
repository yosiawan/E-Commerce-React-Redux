import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';
import ProductDetails from './components/ProductDetails';
import Axios from 'axios';
import { onLogout, keepLogin, cookieChecked, getCategories, getBrands } from './actions';
import {getAllProduct} from './actions/Product'
import { connect } from 'react-redux';
import CategoryPage from './components/CategoryPage';
import SearchResult from './components/SearchResult';
import AdminLoginPage from './components/AdminLoginPage';
import AdminRegisterPage from './components/AdminRegisterPage';
import CheckoutPage from './components/CheckoutPage';
import BrandPage from './components/BrandPage';
import UserTransactionHistory from './components/UserTransactionHistory';
import Footer from './components/Footer';
import {Modal, Button} from 'react-bootstrap';

class App extends Component {

    state = { show: true}

    componentWillMount(){
        this.props.getAllProduct()
        this.props.getCategories()
        this.props.getBrands()
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleClose=()=>{
        this.setState({ show: false });
    }

    popUp=()=>{
        return(
            <div>
                <Modal.Header closeButton>
                    {/* <Modal.Title>This website is experiencing network unstability</Modal.Title> */}
                    <Modal.Title>Welcome to XMX by Yosia S.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Please come back later if you are unable to use this website.
                    <br/><br/> */}
                    Use these credentials to test user's feature :
                    <br/>
                    username : a
                    <br/>
                    password : a
                    <br/><br/>
                    Thank You for visiting this website!
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
            </div>
        )
    }
    render() {
        // console.log("render dijalankan");
        return (
        <div className="App">
            <Header/>
            <div>
                <Route exact path="/" component={HomePage}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/adminlogin" component={AdminLoginPage}/>
                <Route path="/register" component={RegisterPage}/>
                <Route path="/adminregister" component={AdminRegisterPage}/>
                <Route path="/admin" component={Dashboard} />
                <Route path="/productDetails" component={ProductDetails}/>
                <Route path="/categoryPage" component={CategoryPage}/>
                <Route path="/searchResult" component={SearchResult}/>
                <Route path="/checkoutPage" component={CheckoutPage}/>
                <Route path="/brandPage" component={BrandPage}/>
                <Route path="/userTransactionHistory" component={UserTransactionHistory}/>
            <Footer/>
            </div>
            <Modal show={this.state.show} onHide={this.handleClose}>
                    
                {this.popUp()}
                
            </Modal>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;
    const cart = state.cart;
    const categoryList = state.categoryList
    return { auth, cart, categoryList };
}

export default withRouter(connect(mapStateToProps, { onLogout, keepLogin, cookieChecked, getBrands, getCategories, getAllProduct})(App));
