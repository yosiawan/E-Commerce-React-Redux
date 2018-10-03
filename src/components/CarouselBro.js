import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import XPS15 from '../supports/img/XPS 15 - 1.jpg';
import Cookies from 'universal-cookie';
import Axios from 'axios';

const cookies = new Cookies();

class CarouselBro extends Component {

    state = { products: [] }

    selectedProduct(id){
        cookies.set('SelectedProduct', id, { path: '/' });
    }
    
    renderCaroussel=()=>{
        var caroussel = []
        Axios.get("http://localhost:1002/carousselProducts")
        .then(ok=>{
            console.log(ok.data)
            caroussel.push(ok.data);
        })    
        console.log(caroussel)
        return caroussel.map(data=>{
            console.log(data.Img)
            return(
                <div className='geser'>
                    <Link to="/productDetails" onClick={ () => this.selectedProduct(data.idproducts)}>
                        <div>
                            <img src={data.Img} alt=''/>
                        </div>
                    </Link>
                </div>
            )
        })
    }

    render() {
        return(
            <div className='perlebar '>
                <Carousel className=' carousselAdjuster timpaCSScaroussel'  showThumbs={false} autoPlay={true}>
                    {/* {this.renderCaroussel()} */}
                </Carousel>
                <br/>
            </div>
        );
    }
}

export default CarouselBro;