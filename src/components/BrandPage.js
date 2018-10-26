import React, {Component} from 'react';
import queryString from 'query-string'

import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { selectBrand } from '../actions';
import ProductCard from './ProductCard';


const cookies = new Cookies();

class CategoryPage extends Component {
    state={ alphSort:true, numSort:true };

    componentWillMount(){
        this.props.selectBrand((queryString.parse(this.props.location.search)).idbrand);
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

    renderItemList(){
        if(this.props.Product.productList == '' || this.props.Select.selectedBrand == ""){
            return <h4> Please Wait . . .</h4>
        }
        return this.props.Product.productList.map(data=>{
            if(data.Brand == this.props.Select.selectedBrand){
                console.log(data);
                return <ProductCard data={data} />
            }
            
        })
    }

    renderCategoryName(idCategory){
        var ArrBrand = [
            "Null",
            "Acer Laptops",
            "Apple Laptops",
            "Asus Laptops",
            "Dell Laptops",
            "HP Laptops",
            "Lenovo Laptops",
            "Xiaomi Laptops",
            "Other Laptops",
        ]
        return(
            <h2>{ArrBrand[idCategory]}</h2>
        )
        
    }
    render() {
        return(
            <div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <h3>{this.renderCategoryName(this.props.Select.selectedBrand)}</h3>
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
    const Product = state.Product
    const Select = state.Select
    return {Product, Select};
}

export default connect(mapStateToProps, { selectBrand })(CategoryPage);
``