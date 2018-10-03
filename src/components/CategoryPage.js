import React, {Component} from 'react';
import {Grid, Row, Col, Thumbnail, Button} from 'react-bootstrap';
import XPS15 from '../supports/img/XPS 15.jpg';
import MiNotebookAir13 from '../supports/img/Mi Notebook Air 13.jpg';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class CategoryPage extends Component {
    state = { products : []}

    componentWillMount(){
        this.getProductList();
    }
    
    getProductList(){
        var selectedProduct = cookies.get('SelectedCategory')
        console.log(selectedProduct)
        Axios.get("http://localhost:1002/categories/" + selectedProduct)
        .then(ok=>{
            // console.log(ok)
            this.setState({products:ok.data})
            // console.log(this.state.products)
        })
    }

    selectedProduct(id){
        cookies.set('SelectedProduct', id, { path: '/' });
    }

    renderItemList(){
        return this.state.products.map(data=>{
            // console.log(data);
            return(
                <Col xs={6} md={4}>
                    <Thumbnail src={MiNotebookAir13} alt="Picture Not Found">
                        <h3>{data.ProductName} </h3>
                        <p>{data.description}</p><br/>
                        <p>{data.ProductPrice}</p>
                        <p>
                            <Button  onClick={ () => this.selectedProduct(data.idproducts)} bsStyle="primary">
                                <Link to="/productDetails">Details</Link>
                            </Button>
                            &nbsp;
                            {/* <Button bsStyle="default">Buy</Button> */}
                        </p>
                    </Thumbnail>
                </Col>
            )
        })
    }

    renderCategoryName(){
        if(cookies.get('SelectedCategory')==1){
            // console.log('cat 1')
            return(
                "Budget Laptops"
            )
        }else if(cookies.get('SelectedCategory')==2){
            // console.log('cat 1')
            return(
                "Mid-End Laptops"
            )
        }else if(cookies.get('SelectedCategory')==3){
            // console.log('cat 1')
            return(
                "Premium Laptops"
            )
        }else {
            console.log(cookies.get('SelectedCategory'))
            // console.log('gagal')
        }
    }
    render() {
        // console.log(this.state.products[0])
        return(
            <div>
                <br/>
                <br/>
                <br/>
                <h3>{this.renderCategoryName()}</h3>
                {this.renderItemList()}
            </div>
        );
    };
}

export default CategoryPage;