import React, {Component} from 'react';
import {Grid, Row, Col, Thumbnail, Button} from 'react-bootstrap';
import XPS15 from '../supports/img/XPS 15.jpg';
import MiNotebookAir13 from '../supports/img/Mi Notebook Air 13.jpg';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class homepageItemList extends Component {
    state = { products : [], edit : 0 }

    componentWillMount(){
        this.getProductList();
    }
    
    getProductList(){
         Axios.get("http://localhost:1002/products")
        .then(ok=>{
            this.setState({products:ok.data, edit : 0})
            console.log(this.state.products)
        })
    }

    selectedProduct(id){
        cookies.set('SelectedProduct', id, { path: '/' });
    }

    renderItemList(){
        return this.state.products.map(data=>{
            return(
                <Col xs={6} md={4}>
                    <Thumbnail src={MiNotebookAir13} alt="Picture Not Found">
                        <h3>{data.ProductName} </h3>
                        <p>{data.description}</p><br/>
                        <p>{data.ProductPrice}</p>
                        <p>
                            <Button href="/productDetails" onClick={ () => this.selectedProduct(data.idproducts)} bsStyle="primary">Details</Button>
                            &nbsp;
                            {/* <Button bsStyle="default">Buy</Button> */}
                        </p>
                    </Thumbnail>
                </Col>
            )
        })
    }
    render() {
        return(
            <div>
                {this.renderItemList()}
            </div>
        );
    };
}

export default homepageItemList;