import React, {Component} from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import {Redirect} from 'react-router-dom';
import { API_URL_1 } from '../supports/api-url/apiurl';

var cookie = new Cookies();

class UserTransactionHistory extends Component{
    state= {UserTransactionHistory: ''}

    componentWillMount=()=>{
        this.getTransactionHistory()
        console.log('wilmon jalan')
    }

    getTransactionHistory=()=>{
        console.log('jalan')
        console.log(cookie.get('LoggedInUser'))
        Axios.get(API_URL_1 + "userTransactionHistory/" + cookie.get('LoggedInUser') )
        .then(ok=>{
            this.setState({UserTransactionHistory: ok.data})
            console.log(this.state.UserTransactionHistory)
        })
    }

    renderHistory=()=>{
        console.log(this.state)
        if(this.state.UserTransactionHistory == ""){
            <div>
                Please Wait . . .
            </div>
        }
        else {
            return this.state.UserTransactionHistory.map(data=>{
            console.log('wew')
            return(
                <tr >
                    <td>{data.idtranshistory}</td>
                    <td>{data.ProductName}</td>
                    <td>Rp.{parseInt(data.ProductPrice).toLocaleString('id')}</td>
                    <td>{data.amount}</td>
                    <td>Rp. {parseInt(data.amount*data.ProductPrice).toLocaleString('id')}</td>
                </tr>
            )
        })}
    }

    renderGrandTotal=()=>{
        console.log(this.props.auth.username)
        var GrandTotal = 0;
        if(this.state.UserTransactionHistory == ''){
            return <h4>Loading ...</h4>
        }
        this.state.UserTransactionHistory.map(data=>{
            GrandTotal += data.ProductPrice * data.amount
        })
        return GrandTotal;
    }
    render(){
        if(this.props.auth.username == ''){
            return <Redirect to='/'/>
        }
        return(
            <div>
                <br/>
                <br/>
                <br/>
                Your Transaction History
                <table className='container' responsive>
                    <thead>
                        <tr >
                            <th style={{textAlign:"center"}}>ID</th>
                            <th style={{textAlign:"center"}}>ProductName</th>
                            <th style={{textAlign:"center"}}>ProductPrice</th>
                            <th style={{textAlign:"center"}}>Amount</th>
                            <th style={{textAlign:"center"}}>Total</th>
                            
                        </tr>
                    </thead>

                    <tbody>
                        {this.renderHistory()}
                    </tbody>

                    <tfoot>
                        <tr>
                            <th style={{textAlign:"center"}}>Grand Total</th>
                            <th style={{textAlign:"center"}}></th>
                            <th style={{textAlign:"center"}}></th>
                            <th style={{textAlign:"center"}}></th>
                            <th style={{textAlign:"center"}}>Rp. {parseInt(this.renderGrandTotal()).toLocaleString('id')}</th>
                            
                        </tr>
                    </tfoot>
                </table> 
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { auth: state.auth };
}
export default connect(mapStateToProps)(UserTransactionHistory);
