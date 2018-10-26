import React, {Component} from 'react';
import { Col, Thumbnail, Button} from 'react-bootstrap';
import queryString from 'query-string'
import XPS15 from '../supports/img/XPS 15.jpg';
import {Link, Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { selectCategory } from '../actions';
import ProductCard from './ProductCard';

const cookies = new Cookies();

class CategoryPage extends Component {
    state={ alphSort:true, numSort:true };

    componentWillMount(){
        this.props.selectCategory((queryString.parse(this.props.location.search)).idCategory);
    }
    
    selectedProduct(id){
        cookies.set('SelectedProduct', id, { path: '/' });
    }

    sortByName=()=>{
        if(this.state.alphSort == true){
            this.props.Product.productList.sort((a,b)=>{return a.ProductName > b.ProductName;})
            this.setState({alphSort:false})
        }else {
            this.props.Product.productList.sort((a,b)=>{return a.ProductName < b.ProductName;})
            this.setState({alphSort:true})
        }
    }

    sortByPrice =()=>{
        if(this.state.numSort == true){
            this.props.Product.productList.sort((a,b)=>{return a.ProductPrice - b.ProductPrice;})
            this.setState({numSort:false})
        }else {
            this.props.Product.productList.sort((a,b)=>{return b.ProductPrice - a.ProductPrice;})
            this.setState({numSort:true})
        }
    }

    renderItemList=()=>{
        if(this.props.Product.productList == '' || this.props.Select.selectedCategory == ''){
            return <h4> Please Wait . . .</h4>
        }
        return this.props.Product.productList.map(data=>{
            if(data.Category == this.props.Select.selectedCategory){
                return <ProductCard data={data} />
            }
            
        })
    }

    renderCategoryName(){
        if(this.props.Select.selectedCategory==3){
            return(
                "Budget Laptops"
            )
        }else if(this.props.Select.selectedCategory==2){
            return(
                "Mid-End Laptops"
            )
        }else if(this.props.Select.selectedCategory==1){
            return(
                "Premium Laptops"
            )
        }else {
            return "Please Wait . . ."
        }
    }
    render() {
        return(
            <div>
                <br/>
                <br/>
                <br/>
                <h3>{this.renderCategoryName()}</h3>
                <span>
                    <input bsStyle="success" className='btn' type='button' value='Sort By Name' onClick={this.sortByName}/>
                
                    <input bsStyle="success" className='btn' type='button' value='Sort By Price' onClick={this.sortByPrice}/>
                </span>
                <div>
                {this.renderItemList()}

                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    const Product = state.Product
    const Select = state.Select
    return {Product, Select};
}

export default connect(mapStateToProps, { selectCategory })(CategoryPage);
