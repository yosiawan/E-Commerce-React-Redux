import React, {Component} from 'react';
import { Col, Thumbnail, Button} from 'react-bootstrap';
import MiNotebookAir13 from '../supports/img/Mi Notebook Air 13.jpg';
import {Link} from 'react-router-dom';
import {productSearch } from '../actions';
import { connect } from 'react-redux';


class SearchResult extends Component {




    renderItemList(){
        console.log(typeof(this.props.searchResult.searchResult) !== "string")
        console.log(this.props.searchResult.searchResult)
        if(typeof(this.props.searchResult.searchResult) !== "string"){
            // return this.props.searchResult.searchResult.map(data=>{
            //     return(
            //         <Col xs={6} md={4}>
            //             <Thumbnail src={MiNotebookAir13} alt="Picture Not Found">
            //                 <h3>{data.ProductName} </h3>
            //                 <p>{data.description}</p><br/>
            //                 <p>{data.ProductPrice}</p>
            //                 <p>
            //                     <Button href="/productDetails" onClick={ () => this.selectedProduct(data.idproducts)} bsStyle="primary">Details</Button>
            //                     &nbsp;
            //                     {/* <Button bsStyle="default">Buy</Button> */}
            //                 </p>
            //             </Thumbnail>
            //         </Col>
            //     )
            // })
        } else if(typeof(this.props.searchResult.searchResult) == "string"){
            return(
                <div>
                    <br/>
                    <br/>
                    <br/>
                    <h3>{this.props.searchResult}</h3>
                </div>
            )
        }
    }
    render() {
        return(
            <div>
                <br/>
                <br/>
                <br/>
                <br/>
                <h1> SEARCH RESULT PAGE</h1>
                {this.renderItemList()}
            </div>
        );
    };
}
const mapStateToProps = (state) => {
    const searchResult = state.searchResult
    return {searchResult};
}

export default connect(mapStateToProps, {productSearch})(SearchResult);
