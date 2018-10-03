import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import XPS15 from '../supports/img/XPS 15 - 1.jpg';

class CarouselBro extends Component {
    render() {
        return(
            <div className='perlebar '>
                {/* <h3>
                    Recommended Items
                </h3> */}
                <Carousel className=' carousselAdjuster timpaCSScaroussel' infiniteLoop={true} showThumbs={false} autoPlay={true}>

                    <div className='geser'>
                        <Link to="/productDetails">
                            <div>
                                <img src={XPS15} alt=''/>
                            </div>
                        </Link>
                    {/* <p className="legend">{this.props.legend2}</p> */}
                    </div>
                
                    <div className='geser'>
                        <Link to="/productDetails">
                            <div>
                                <img src="http://www.itguyswa.com.au/wp-content/uploads/2017/06/laptop-xps-15-9550-pdp-polaris-02.jpg" alt=''/>
                            </div>
                        </Link>
                    </div>
                    
                    <div className='geser'>
                        <Link to="/productDetails1">
                            <div>
                                <img src="https://images.indianexpress.com/2017/06/xiaomi-mi-notebook-air-13-official.jpg" alt=''/>
                            </div>
                        </Link>
                    </div>
                    
                </Carousel>
                <br/>
            </div>
        );
    }
}

export default CarouselBro;