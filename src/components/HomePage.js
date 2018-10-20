import React, { Component } from 'react';
import CarouselBro from './CarouselBro';
import ItemList from './homepageItemList';


const HomePage = () => {
    return (
        <div style={{ marginTop: "50px" }} >
            <CarouselBro/>
            <ItemList/>
        </div>
    );
}

export default HomePage;