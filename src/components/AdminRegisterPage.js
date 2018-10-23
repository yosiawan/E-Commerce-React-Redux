import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { onAdminRegister } from '../actions';
import '../supports/css/components/loginpage.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class AdminRegisterPage extends Component {

    onRegisterClick = () => {
        this.props.onAdminRegister({ 
            username: this.refs.username.value, 
            password: this.refs.password.value
        });
    }

    render() {
        if(this.props.admin.username === "") {
            return (
                <div className="login-background">
                    <div className="container">
                        <h1 className="form-heading">Admin Register</h1>
                        <div className="login-form">
                            <div className="main-div">
                                <div className="panel">
                                    <h2>Join the Rat Race!</h2>
                                    <p>Please fill the form below</p>
                                </div>
                                <form id="Login">
                                    <div className="form-group">
                                        <input type="text" ref="username" className="form-control" id="inputUsername" placeholder="Username" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" ref="password" className="form-control" id="inputPassword" placeholder="Password" />
                                    </div>
                                    <div>{this.props.admin.error}</div>
                                    <input type="button" className="btn btn-primary" value="Register" onClick={this.onRegisterClick} />
    
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
    return { admin: state.admin };
}

export default connect(mapStateToProps, { onAdminRegister })(AdminRegisterPage);