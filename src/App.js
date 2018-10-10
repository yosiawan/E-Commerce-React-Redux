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


class App extends Component {

    componentWillMount(){
        this.props.getAllProduct()
        this.props.getCategories()
        this.props.getBrands()
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
