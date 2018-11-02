import React, {Component} from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import queryString from 'query-string';
import { Modal } from 'react-bootstrap';

import { API_URL_1 } from '../supports/api-url/apiurl';


class UserTransactionHistory extends Component{
    state= { UserTransactionHistory: '', show: false, transDetail: [] }

    componentWillMount=()=>{
        this.getTransactionHistory()
    }

    getTransactionHistory=()=>{
        Axios.get(API_URL_1 + "userTransactionHistory/" + (queryString.parse(this.props.location.search)).user )
        .then(ok=>{
            this.setState({UserTransactionHistory: ok.data})
        })
    }

    handleShow =()=> {
        this.setState({ show: true });
    }

    handleClose=()=>{
        this.setState({ show: false });
    }

    getTransDetail = (id) => {
        Axios.post(API_URL_1 + `userTransHistoryDetail`, { idtranshistory: id })
        .then(res => {
            console.log(res.data)
            this.setState({ transDetail: res.data })
        }).catch( err => { 
            console.log(err)
        })
    }

    renderTransDetail = () => {
        if(this.state.transDetail.length > 0){
            return this.state.transDetail.map(data=>{
                return(
                    <tr onClick={ () => { this.getTransDetail(data.idtranshistory), this.handleShow() }}>
                        <td>{data.idtranshistory}</td>
                        <td>{data.ProductName}</td>
                        <td>Rp.{parseInt(data.ProductPrice).toLocaleString('id')}</td>
                        <td>{data.amount}</td>
                        <td>Rp.{parseInt(data.GrandTotal).toLocaleString('id')}</td>
                    </tr>
                )
            })
        }else {
            return <h3> Please Wait . . . </h3>
        }
        
    }

    renderHistory=()=>{
        if(this.state.UserTransactionHistory == ""){
            <div>
                Please Wait . . .
            </div>
        }
        else {
            return this.state.UserTransactionHistory.map(data=>{
                return(
                    <tr onClick={ () => { this.getTransDetail(data.idtranshistory), this.handleShow() }}>
                        <td>{data.idtranshistory}</td>
                        <td>{data.username}</td>
                        <td>Rp.{parseInt(data.TransactionValue).toLocaleString('id')}</td>
                        <td>{data.Address}</td>
                        <td>{data.DeliveryMethod}</td>
                        <td>{data.Payment}</td>
                        <td>{data.Date}</td>
                    </tr>
                )
            })
        }
    }

    renderGrandTotal=()=>{
        var GrandTotal = 0;
        if(this.state.transDetail == ''){
            return <h4>Loading ...</h4>
        }
        this.state.transDetail.map(data=>{
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
                <table style={{ margin: 'auto' }} className='tftable'>
                    <thead>
                        <tr >
                            <th style={{textAlign:"center"}}>ID</th>
                            <th style={{textAlign:"center"}}>Username</th>
                            <th style={{textAlign:"center"}}>Transaction Value</th>
                            <th style={{textAlign:"center"}}>Address</th>
                            <th style={{textAlign:"center"}}>Delivery Method</th>
                            <th style={{textAlign:"center"}}>Payment Method</th>
                            <th style={{textAlign:"center"}}>Transaction Date</th>

                        </tr>
                    </thead>

                    <tbody>
                        {this.renderHistory()}
                    </tbody>
                </table> 

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <table style={{ margin: 'auto' }} className='tftable'>
                        <thead>
                            <tr>
                                <th style={{textAlign:"center"}}>Transaction ID</th>
                                <th style={{textAlign:"center"}}>ProductName</th>
                                <th style={{textAlign:"center"}}>Price</th>
                                <th style={{textAlign:"center"}}>Amount</th>
                                <th style={{textAlign:"center"}}>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTransDetail()}
                        </tbody>
                        <tfoot>
                            <th style={{textAlign:"center"}}>GrandTotal</th>
                            <th style={{textAlign:"center"}}></th>
                            <th style={{textAlign:"center"}}></th>
                            <th style={{textAlign:"center"}}></th>
                            <th style={{textAlign:"center"}}>Rp. {parseInt(this.renderGrandTotal()).toLocaleString('id')}</th>
                        </tfoot>
                    </table>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { auth: state.auth };
}
export default connect(mapStateToProps)(UserTransactionHistory);
