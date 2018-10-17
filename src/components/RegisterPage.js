import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { onRegister } from '../actions';
import '../supports/css/components/loginpage.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class RegisterPage extends Component {

    componentWillReceiveProps(newProps) {
        console.log(newProps)
        if(newProps.auth.username !== "") {
            cookies.set('LoggedInUser', newProps.auth.username, { path: '/' });
            console.log(cookies.get('LoggedInUser'))
        }
    }

    onRegisterClick = () => {
        this.props.onRegister({ 
            username: this.refs.username.value, 
            password: this.refs.password.value
        });
    }

    render() {
        if(this.props.auth.username === "") {
            return (
                <div className="login-background">
                    <div className="container">
                        <h1 className="form-heading">Register Form</h1>
                        <div className="login-form">
                            <div className="main-div">
                                <div className="panel">
                                    <h2>Lets Join the Club!</h2>
                                    <p>Please fill the form below</p>
                                </div>
                                <form id="Login">
                                    <div className="form-group">
                                        <input type="text" ref="username" className="form-control" id="inputUsername" placeholder="Username" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" ref="password" className="form-control" id="inputPassword" placeholder="Password" />
                                    </div>
                                    <div>{this.props.auth.error}</div>
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
    return { auth: state.auth };
}

export default connect(mapStateToProps, { onRegister })(RegisterPage);