import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import XPS15 from '../supports/img/XPS 15 - 1.jpg';
import Cookies from 'universal-cookie';
import Axios from 'axios';
import '../supports/css/nodwsHeader.css'
const cookies = new Cookies();

class CarouselBro extends Component {

    // state = { products: [], carousel:'' }

    // selectedProduct(id){
    //     cookies.set('SelectedProduct', id, { path: '/' });
    // }
    
    // componentWillMount(){
    //     this.getCaroussel();
    // }
    // getCaroussel=()=>{
    //     Axios.get("http://localhost:1002/carousselProducts")
    //     .then(ok=>{
    //         console.log(ok.data)
    //         this.setState({carousel: ok.data})
    //     })    
    // }
    // renderCaroussel=()=>{
    //     if(this.state.carousel == ''){
    //         return <div>Please Wait . . .</div>
    //     }
    //     return this.state.carousel.map(data=>{
    //         console.log(data.Img)
    //         return(
    //             <div className='geser'>
    //                 <Link to="/productDetails" onClick={ () => this.selectedProduct(data.idproducts)}>
    //                     <div>
    //                         <img src={data.Img} alt=''/>
    //                     </div>
    //                 </Link>
    //             </div>
    //         )
    //     })
    // }
    
        

    render() {
        return(
            <div className='perlebar '>
                {/* <Carousel className=' carousselAdjuster timpaCSScaroussel'  showThumbs={false} autoPlay={true}>
                    {this.renderCaroussel()}
                </Carousel>
                <br/> */}
                <div class="header">
                    <div class="info">
                        <h1>
                            Welcome to XMX
                        </h1>
                        <div class="meta">
                            <br/>
                            By Yosia Setiawan
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CarouselBro;