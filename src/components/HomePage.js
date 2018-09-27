import React, { Component } from 'react';
import CarouselBro from './CarouselBro';
import ItemList from './homepageItemList';


class HomePage extends Component {
    
        render() {
            return (
            <div style={{ marginTop: "50px" }} >
                <CarouselBro/>
                <ItemList/>
                {/* <input style={{ marginBottom: "50px" }} type="button" value="Delete" onClick={this.onDeleteClick} className="btn btn-danger"/>
                <input style={{ marginBottom: "50px" }} type="button" value="Edit" onClick={this.onEditClick} className="btn btn-warning"/> */}

            </div>
        );
    }
}

export default HomePage;