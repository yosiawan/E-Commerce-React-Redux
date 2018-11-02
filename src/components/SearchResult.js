import React, {Component} from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import queryString from 'query-string'
import { Col, Row } from 'react-bootstrap';

import  {productSearch, filteredSearch } from '../actions';
import ProductCard from './ProductCard';
import Axios from 'axios';


class SearchResult extends Component {
    
    state = { alphSort:true, numSort:true, filtered: false };
    
    componentWillMount(){
        if(this.state.filtered === false){
            this.props.productSearch((queryString.parse(this.props.location.search)).search);
        }else {
            this.props.filteredSearch({ 
                ProductName: (queryString.parse(this.props.location.search)).search,
                Brand: this.refs.brandFilter.value,
                Category: this.refs.categoryFilter.value 
            })
        }
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
    }

    
    renderItemList(){
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

    renderBrands = () => {
        if(this.props.Brand.brandList == ""){
            return <h4>Please Wait . . .</h4>
        }
        return this.props.Brand.brandList.map(data=>{
            return(
                <option value={data.idbrand}>{data.Brand}</option>
            )
        })
    }

    renderCategory = () => {
        if(this.props.Category.categoryList == ""){
            return <h4>Please Wait . . .</h4>
        }
        return this.props.Category.categoryList.map(data=>{
            return(
                <option value={data.idCategory}>{data.Category}</option>
            )
        })
    }

    filter = async () => {
        await this.setState({ filtered : true })
        await this.props.filteredSearch({ 
            ProductName: (queryString.parse(this.props.location.search)).search,
            Brand: this.refs.brandFilter.value,
            Category: this.refs.categoryFilter.value 
        })
    }

    render() {
        return(
            <div>
                <br/>
                <br/>

                <h1> SEARCH  PAGE</h1>
                <div>
                    <Row>
                        <Col xs={6} >
                            <h3>Sort by</h3>
                            <span>
                                <input bsStyle="success" className='btn' type='button' value='Name' onClick={this.sortByName}/>
                                <input bsStyle="success" className='btn' type='button' value='Price' onClick={this.sortByPrice}/>
                            </span>
                        </Col>

                        <Col xs={6} >
                            <h3>Filter by</h3>
                            <select ref='brandFilter' onChange={this.filter}>
                                <option value="" >Brand</option>
                                {this.renderBrands()}
                            </select>
                            <select ref='categoryFilter' onChange={this.filter}>
                                <option value="" >Category</option>
                                {this.renderCategory()}
                            </select>
                        </Col>
                    </Row>
                </div>
                    

                
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
    const Brand = state.Brand
    const Category = state.Category
    return { admin, searchResult, Brand, Category };
}

export default withRouter(connect(mapStateToProps, { productSearch, filteredSearch })(SearchResult));
