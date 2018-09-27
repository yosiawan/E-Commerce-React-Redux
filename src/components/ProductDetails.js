import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import XPS15 from '../supports/img/XPS 15 - 1.jpg';
import Cookies from 'universal-cookie';
import {Image, Col, Button} from 'react-bootstrap';
import Axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl';
import { addToCart } from '../actions';

const cookies = new Cookies();

class ProductDetails extends Component {
    state = {product:null}

    componentWillMount(){
        this.getSelectedProduct()
    }
    getSelectedProduct(){
        var selected = cookies.get('SelectedProduct')
        Axios.get('http://localhost:1002/products/' + selected)
        .then(ok=>{
            console.log(ok.data)
            this.setState({product:ok.data})
            console.log(this.state.product[0].ProductName)
        })
    }
    renderContent(){
        console.log(this.state.product)
        if(this.state.product.length >= 0 ){
            const {ProductName, ProductPrice, Description, Brand, Color, ScreenSize, RAM, Storage, Stock} = this.state.product[0]
            return([
                ProductName,
                ProductPrice,
                Description, 
                Brand, 
                Color, 
                ScreenSize, 
                RAM, 
                Storage, 
                Stock
            ])
        }
    }
    addToCart(id){
        this.props.addToCart(id)
    }
    render(){
        if (this.state.product === null) {
            return(
                <div>
                    <br/>
                    <br/>
                    <br/>
                    <h3>Please Wait</h3>
                </div>
                
            )
        }
        console.log(this.state.product[0].ProductName)
        return(
            <div >
                <h3>
                    <br/>
                    <br/>
                    <br/>
                    {this.state.product[0].ProductName}
                </h3>
                <Col className="container container-fluid" xs={12} >
                     <Image src={XPS15} responsive />
                 </Col>

                <Col xsHidden xs={2} />
                <p className='col col-xs-8'>
                    {this.state.product[0].Description}
                </p>
                <Col xsHidden xs={5} />
                <Button onClick={ () => this.addToCart(this.state.product[0].idproducts)} className='col-xs-2' bsStyle="primary">Buy Now</Button>
                <Col xsHidden xs={5} />

            </div>
        )
        
       
        // return(
        //     <div >
        //         <br/>
        //         <br/>
        //         <br/>

        //         {/* <h3>{this.renderContent()}</h3> */}

        //         <Col className="container container-fluid" xs={12} >
        //             <Image src={XPS15} responsive />
        //         </Col>

        //         <Col xsHidden xs={2} />
        //         <p className='col col-xs-8'>
        //             Lorem ipsum dolor sit amet consectectur adipiscing 
        //             Lorem ipsum dolor sit amet consectectur adipiscing
        //             Lorem ipsum dolor sit amet consectectur adipiscing
        //             Lorem ipsum dolor sit amet consectectur adipiscing
        //             Lorem ipsum dolor sit amet consectectur adipiscing
        //         </p>

        //         <Col xsHidden xs={5} />
        //         <Button onClick={ () => this.addToCart(this.state.product[0].idproducts)} className='col-xs-2' bsStyle="primary">Buy Now</Button>
        //         <Col xsHidden xs={5} />

        //     </div>
        // )
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;
    const selectedProduct = state.selectedProduct;
    return { auth, selectedProduct };
}

export default connect(mapStateToProps, addToCart)(ProductDetails);
// export default ProductDetails;