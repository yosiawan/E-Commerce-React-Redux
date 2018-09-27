import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { onLogin } from '../actions';
import '../supports/css/components/loginpage.css';

const cookies = new Cookies();

class LoginPage extends Component {

    componentWillReceiveProps(newProps) {
        if(newProps.auth.username !== "") {
            cookies.set('LoggedInUser', newProps.auth.username, { path: '/' });
            console.log(cookies.get('LoggedInUser'))
        }
    }

    onLoginClick = () => {
        var username = this.refs.username.value;
        var password = this.refs.password.value;

        this.props.onLogin({ username, password });
    }
    
    render() {
        if(this.props.auth.username === ""){
            return (
                <div className="login-background">
                    <div className="container">
                        <h1 className="form-heading">Login Form</h1>
                        <div className="login-form">
                            <div className="main-div">
                                <div className="panel">
                                    <h2>Its nice to have you back!</h2>
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
                                    <h2 className="label-danger">{this.props.auth.error}</h2>
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
    const auth = state.auth;

    return { auth };
}

export default connect(mapStateToProps, { onLogin })(LoginPage);
