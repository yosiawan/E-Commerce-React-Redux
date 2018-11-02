import React, { Component } from 'react';
import { Col, Thumbnail, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import XPS15 from '../supports/img/XPS 15.jpg';

class ProductCard extends Component {
    
    render() {
        return(
            <Col xs={6} md={4}>
                <Thumbnail src={XPS15} alt="Picture Not Found">
                    <h3>{this.props.data.ProductName} </h3>
                    <p>{this.props.data.description}</p><br/>
                    <p>Rp. {parseInt(this.props.data.ProductPrice).toLocaleString('id')}</p>
                    <p>
                        <Link to={`/productDetails?idproducts=${this.props.data.idproducts}`}>
                            <Button  bsStyle="success">
                                Details
                            </Button>
                        </Link>
                        &nbsp;
                    </p>
                </Thumbnail>
            </Col>
        )
    }
}

export default ProductCard;
