import React, {Component} from 'react';
import {Grid, Row, Col, Thumbnail, Button} from 'react-bootstrap';
import XPS15 from '../supports/img/XPS 15.jpg';
import MiNotebookAir13 from '../supports/img/Mi Notebook Air 13.jpg';
import {Link, Redirect} from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';

const cookies = new Cookies();

class CategoryPage extends Component {
    state={ alphSort:true, numSort:true };

    // componentWillMount(){
    //     this.getProductList();
    // }
    
    // getProductList(){
    //     var selectedProduct = cookies.get('SelectedCategory')
    //     console.log(selectedProduct)
    //     Axios.get("http://localhost:1002/categories/" + selectedProduct)
    //     .then(ok=>{
    //         // console.log(ok)
    //         this.setState({products:ok.data})
    //         // console.log(this.state.products)
    //     })
    // }

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
        // console.log(this.props.searchResult.searchResult)
    }

    sortByPrice =()=>{
        if(this.state.numSort == true){
            this.props.Product.productList.sort((a,b)=>{return a.ProductPrice - b.ProductPrice;})
            this.setState({numSort:false})
        }else {
            this.props.Product.productList.sort((a,b)=>{return b.ProductPrice - a.ProductPrice;})
            this.setState({numSort:true})
        }
        // console.log(this.props.searchResult.searchResult)
    }

    renderItemList=()=>{
        if(this.props.Product.productList == '' || this.props.Select.selectedCategory == ''){
            // console.log(this.props.Product.productList)
            return <h4> Please Wait . . .</h4>
        }
        return this.props.Product.productList.map(data=>{
            // console.log(data.Category);
            if(data.Category == this.props.Select.selectedCategory){
                // console.log(data);
                return(
                    <Col xs={6} md={4}>
                        <Thumbnail src={XPS15} alt="Picture Not Found">
                            <h3>{data.ProductName} </h3>
                            <p>{data.description}</p><br/>
                            <p>Rp. {parseInt(data.ProductPrice).toLocaleString('id')}</p>
                            <p>
                                <Link to="/productDetails">
                                    <Button  onClick={ () => this.selectedProduct(data.idproducts)} bsStyle="primary">
                                        Details
                                    </Button>
                                </Link>
                                &nbsp;
                                {/* <Button bsStyle="default">Buy</Button> */}
                            </p>
                        </Thumbnail>
                    </Col>
                )
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
        // console.log(this.props.Product.productList)
        if(this.props.Select.selectedCategory == ''){
            return <Redirect to='/'/>
        }
        return(
            <div>
                <br/>
                <br/>
                <br/>
                <h3>{this.renderCategoryName()}</h3>
                <span>
                    <input className='btn' type='button' value='Sort By Name' onClick={this.sortByName}/>
                
                    <input className='btn' type='button' value='Sort By Price' onClick={this.sortByPrice}/>
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

export default connect(mapStateToProps)(CategoryPage);
