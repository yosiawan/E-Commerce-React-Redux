import React, {Component} from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import queryString from 'query-string'

import {productSearch } from '../actions';
import ProductCard from './ProductCard';


class SearchResult extends Component {
    
    state={ alphSort:true, numSort:true };
    
    componentWillMount(){
        this.props.productSearch((queryString.parse(this.props.location.search)).search);
    }

    sortByName=()=>{
        if(this.props.searchResult.searchResult !== null){
            if(this.state.alphSort == true){
                this.props.searchResult.searchResult.sort((a,b)=>{return a.ProductName > b.ProductName;})
                this.setState({alphSort:false})
            }else {
                this.props.searchResult.searchResult.sort((a,b)=>{return a.ProductName < b.ProductName;})
                this.setState({alphSort:true})
            }
        }
        // console.log(this.props.searchResult.searchResult)
    }

    sortByPrice =()=>{
        if(this.props.searchResult.searchResult !== null){
            if(this.state.numSort == true){
                this.props.searchResult.searchResult.sort((a,b)=>{return a.ProductPrice - b.ProductPrice;})
                this.setState({numSort:false})
            }else {
                this.props.searchResult.searchResult.sort((a,b)=>{return b.ProductPrice - a.ProductPrice;})
                this.setState({numSort:true})
            }
        }
        // console.log(this.props.searchResult.searchResult)
    }

    
    renderItemList(){
        // console.log(this.props.searchResult.searchResult)
        if(this.props.searchResult.searchResult !== null){
            return this.props.searchResult.searchResult.map((data, index)=>{
                return <ProductCard data={data} />

            })
        } else if(this.props.searchResult.searchResult == null){
            return(
                <div>
                    <br/>
                    <br/>
                    <br/>
                    <h4>{this.props.searchResult.err}.</h4>
                </div>
            )
        }
    }
    render() {
        console.log(this.props.admin)
        return(
            <div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <h1> SEARCH  PAGE</h1>
                <span>
                    <input bsStyle="success" className='btn' type='button' value='Sort By Name' onClick={this.sortByName}/>
                
                    <input bsStyle="success" className='btn' type='button' value='Sort By Price' onClick={this.sortByPrice}/>
                </span>
                <br/>
                <br/>
                <div>
                    {this.renderItemList()}
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    const searchResult = state.searchResult;
    const admin = state.admin
    return {admin, searchResult};
}

export default withRouter(connect(mapStateToProps, {productSearch})(SearchResult));
