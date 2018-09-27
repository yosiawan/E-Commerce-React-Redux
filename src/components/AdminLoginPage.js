import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { onAdminLogin } from '../actions';
import '../supports/css/components/loginpage.css';

const cookies = new Cookies();

class LoginPage extends Component {

    componentWillReceiveProps(newProps) {
        if(newProps.admin.username !== "") {
            cookies.set('LoggedInAdmin', newProps.admin.username, { path: '/' });
            console.log(cookies.get('LoggedInAdmin'))
        }
    }

    onLoginClick = () => {
        var username = this.refs.username.value;
        var password = this.refs.password.value;

        this.props.onAdminLogin({ username, password });
    }
    
    render() {
        if(this.props.admin.username === ""){
            return (
                <div className="login-background">
                    <div className="container">
                        <h1 className="form-heading">Admin Login Form</h1>
                        <div className="login-form">
                            <div className="main-div">
                                <div className="panel">
                                    <h2>Welcome Back</h2>
                                    <p>Please enter your username and password</p>
                                </div>
                                <form id="Login">
    
                                    <div className="form-group">
    
    
                                        <input type="username" ref="username" className="form-control" id="inputEmail" placeholder="Email Address" />
    
                                    </div>
    
                                    <div className="form-group">
    
                                        <input type="password" ref="password" className="form-control" id="inputPassword" placeholder="Password" />
    
                                    </div>
                                    <div className="forgot">
                                        <a href="reset.html">Forgot password?</a>
                                    </div>
                                    <input type="button" className="btn btn-primary" value="Login" onClick={this.onLoginClick}/>
                                    <h2 className="label-danger">{this.props.admin.error}</h2>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return <Redirect to="/" />;
        
    }
}

const mapStateToProps = (state) => {
    const admin = state.admin;
    return { admin };
}

export default connect(mapStateToProps, { onAdminLogin })(LoginPage);
