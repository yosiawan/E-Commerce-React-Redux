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
    
    state={ alphSort:true, numSort:true };

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

    sortByName=()=>{
        if(this.state.alphSort == true){
            this.props.searchResult.searchResult.sort((a,b)=>{return a.ProductName > b.ProductName;})
            this.setState({alphSort:false})
        }else {
            this.props.searchResult.searchResult.sort((a,b)=>{return a.ProductName < b.ProductName;})
            this.setState({alphSort:true})
        }
        // console.log(this.props.searchResult.searchResult)
    }

    sortByPrice =()=>{
        if(this.state.numSort == true){
            this.props.searchResult.searchResult.sort((a,b)=>{return a.ProductPrice - b.ProductPrice;})
            this.setState({numSort:false})
        }else {
            this.props.searchResult.searchResult.sort((a,b)=>{return b.ProductPrice - a.ProductPrice;})
            this.setState({numSort:true})
        }
        // console.log(this.props.searchResult.searchResult)
    }

    
    renderItemList(){
        // console.log(this.props.searchResult.searchResult)
        if(this.props.searchResult.searchResult !== null){
            return this.props.searchResult.searchResult.map((data, index)=>{
                return(
                    <Col xs={6} md={4} index>
                        <Thumbnail src={MiNotebookAir13} alt="Picture Not Found">
                            <h3>{data.ProductName} </h3>
                            <p>{data.description}</p><br/>
                            <p>Rp. {parseInt(data.ProductPrice).toLocaleString('id')}</p>
                            <p>
                                <Link to="/productDetails">
                                    <Button  onClick={ () => this.selectedProduct(data.idproducts)} bsStyle="primary">
                                        Details
                                    </Button>
                                </Link>
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
                    <h4>{this.props.searchResult.err}.</h4>
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
                    <input className='btn' type='button' value='Sort By Name' onClick={this.sortByName}/>
                
                    <input className='btn' type='button' value='Sort By Price' onClick={this.sortByPrice}/>
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
