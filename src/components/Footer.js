import React, {Component} from 'react';
import '../supports/css/braverFooter.css';
import {Link} from 'react-router-dom';

class Footer extends Component {

    render(){
        return(
            <div class="footer">
                <div style={{background:'#449d44'}} id="button">
                
                </div>
                <div id="container">
                    {/* <div id="cont">
                        <br/>
                        <br/>
                        <div class="footer_center">
                            <h3 style={{color: '#449d44'}}>Footer</h3>
                        </div>
                        <div>
                            Lorem Ipsum Dolor Sit Amet Consectetur.
                        </div>
                        
                        
                    </div> */}
                    <div className='col col-xs-6'>
                        <br/>
                        Lorem Ipsum Dolor Sit Amet Consectetur.
                        Lorem Ipsum Dolor Sit Amet Consectetur.
                        Lorem Ipsum Dolor Sit Amet Consectetur.
                        Lorem Ipsum Dolor Sit Amet Consectetur.
                        Lorem Ipsum Dolor Sit Amet Consectetur.
                        Lorem Ipsum Dolor Sit Amet Consectetur.
                        Lorem Ipsum Dolor Sit Amet Consectetur.
                    </div>
                    <div className='col col-xs-6'>
                        <br/>
                        <Link to='/adminlogin'>Admin Login</Link>
                        <br/>
                        <Link to='/adminregister'>Admin Register</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;