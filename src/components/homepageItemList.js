import React, {Component} from 'react';
import {Grid, Row, Col, Thumbnail, Button} from 'react-bootstrap';
import XPS15 from '../supports/img/XPS 15.jpg';
import MiNotebookAir13 from '../supports/img/Mi Notebook Air 13.jpg';
import {Link} from 'react-router-dom';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
// import { selectProduct} from '../actions';

const cookies = new Cookies();

class homepageItemList extends Component {

    selectedProduct(id){
        cookies.set('SelectedProduct', id, { path: '/' });
    }

    renderItemList(){
        if(this.props.Product.productList == ""){
            return(
                <div>
                    <h1>
                        Please wait . . .
                    </h1>
                </div>
            )
        }
        console.log(this.props.Product)
        return this.props.Product.productList.map(data=>{
            return(
                <Col xs={6} lg={4}>
                    <Thumbnail src={data.Img} alt="Picture Not Found">
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
                        </p>
                    </Thumbnail>
                </Col>
            )
        })
    }
    render() {
        return(
            <div>
                <br/>
                <br/>
                <br/>
                {this.renderItemList()}
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    const Product = state.Product
    return {Product};
}

export default connect(mapStateToProps)(homepageItemList);