import React, {Component} from 'react';
import { Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';


class homepageItemList extends Component {


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
            return <ProductCard data={data} />
        })
    }
    render() {
        return(
            <div style={{backgroundColor:'white'}}>
                <br/>
                <br/>
                <br/>
                <Grid>
                {this.renderItemList()}

                </Grid>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    const Product = state.Product
    return {Product};
}

export default connect(mapStateToProps)(homepageItemList);