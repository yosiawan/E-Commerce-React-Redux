import React, {Component} from 'react';
import { Col, Thumbnail, Button} from 'react-bootstrap';
import MiNotebookAir13 from '../supports/img/Mi Notebook Air 13.jpg';
import {Link} from 'react-router-dom';
import {productSearch } from '../actions';
import { connect } from 'react-redux';
import Axios from 'axios';
import {withRouter} from 'react-router-dom'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class SearchResult extends Component {
    
    state={listKaryawan:[], listCabang:[], editedItemID:0};

    componentWillMount(){
        // Axios.get('http://localhost:1002/products')
        // .then((res)=>{
        //     // console.log(res.data);
        //     this.setState({listProducts:res.data})
        // })
    }
    
    // onSearchBtnClick=()=>{
    //     this.props.productSearch(this.refs.search.value)
    //     console.log(this.props.searchResult.searchResult)
    // }
    
    selectedProduct(id){
        cookies.set('SelectedProduct', id, { path: '/' });
    }

    renderItemList(){
        console.log(this.props.searchResult.searchResult)
        if(this.props.searchResult.searchResult !== null){
            return this.props.searchResult.searchResult.map((data, index)=>{
                return(
                    <Col xs={6} md={4} index>
                        <Thumbnail src={MiNotebookAir13} alt="Picture Not Found">
                            <h3>{data.ProductName} </h3>
                            <p>{data.description}</p><br/>
                            <p>{data.ProductPrice.toLocaleString('id')}</p>
                            <p>
                                <Button  onClick={ () => this.selectedProduct(data.idproducts)} bsStyle="primary">
                                    <Link to="/productDetails">Details</Link>
                                </Button>
                                &nbsp;
                                {/* <Button bsStyle="default">Buy</Button> */}
                            </p>
                        </Thumbnail>
                    </Col>
                );
            })
        } else if(this.props.searchResult.searchResult == null){
            return(
                <div>
                    <br/>
                    <br/>
                    <br/>
                    <h4>Search your desired product.</h4>
                </div>
            )
        }
    }
    render() {
        console.log(this.props.admin)
        return(
            <div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <h1> SEARCH  PAGE</h1>
                <span>
                    {/* <input type='text' ref='search' placeholder='Search Product'/> */}
                    {/* <input type='button' value='Search' onClick={this.onSearchBtnClick}/> */}
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
    const searchResult = state.searchResult;
    const admin = state.admin
    return {admin, searchResult};
}

export default withRouter(connect(mapStateToProps, {productSearch})(SearchResult));
