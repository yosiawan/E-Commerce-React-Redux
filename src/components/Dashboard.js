import React, {Component} from 'react';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import '../supports/css/bootstrap.css'

class Dashboard extends Component {
    state={products:[], editedItemID:0};

    componentWillMount(){
        Axios.get("http://localhost:1002/productsDetails")
        .then(ok=>{
            this.setState({products:ok.data, editedItemID : 0})
            console.log(this.state.products)
        })
    }

    onEditBtnCLick=(id)=>{
        console.log(id)
        this.setState( {editedItemID: id} )
        console.log(this.state.editedItemID)
    }

    onDeleteBtnCLick(idproducts){
        console.log(idproducts)
        if(window.confirm('Are You Sure You Want To Delete This Data?')){
            Axios.delete('http://localhost:1002/products/' + idproducts)
            .then((res)=>{
                alert('Delete Success');
                this.setState({products: res.data})
            }).catch((err)=>{
                alert('Error');
                console.log(err)
            })
        }
    }
    
    onAddBtnClick = () => {
        Axios.post('http://localhost:1002/products', {
            ProductName: this.refs.AddProductName.value,
            ProductPrice: this.refs.AddProductPrice.value,
            // Category: this.refs.AddCategory.value,
            Description: this.refs.AddDescription.value,
            RAM: this.refs.AddRAM.value,
            Storage: this.refs.AddStorage.value,
            Stock: this.refs.AddStock.value
        }).then((res)=>{
            Axios.get("http://localhost:1002/productsDetails")
            .then(ok=>{
                this.setState({products:ok.data, editedItemID : 0})
                console.log(this.state.products)
            })
            console.log(res.data);
        }).catch((err)=>{
            alert('Error');
            console.log(err)
        })
    }

    onCancelBtnClick=()=>{
        this.setState({editedItemID: 0})
        console.log(this.state.editedItemID)
    }

    onSaveBtnClick=(id)=>{
        console.log(this.refs.editStock.value)
        Axios.put(`http://localhost:1002/products/${id}`, {
            //fill with details
            ProductName: this.refs.editNama.value,
            ProductPrice: this.refs.editPrice.value,
            Description: this.refs.editDescription.value,
            RAM: this.refs.editRAM.value,
            Storage: this.refs.editStorage.value,
            Stock: this.refs.editStock.value
        }).then((res)=>{
            alert('edit sakses');
            this.setState({products: res.data, editedItemID:0});
            console.log(res.data)
        }).catch((err)=>{
            alert('Error');
            console.log(err)
        })
    }

    renderTabelProduct = () => {
        // console.log('render karyawan berjalan')
        const arrJSX = this.state.products.map((products, key)=>{
            console.log(products)
            if(this.state.editedItemID == products.idproducts){
                return(
                    <tr key={key}>
                    <td>{products.idproducts}</td>
                    <td><input type='text' ref='editNama' defaultValue={products.ProductName}/></td>
                    <td>Rp.<input type='number' ref='editPrice'defaultValue={products.ProductPrice}/></td>
                    <td>
                        {/* <select ref='editCategory' >
                            <option defaultValue={products.idCategory}>Pilih Category</option>
                            {this.renderOptionCategory()}
                        </select> */}
                    </td>
                    <td><input type='text' ref='editDescription' defaultValue={products.Description}/></td>
                    <td><input type='number' ref='editRAM'defaultValue={products.RAM}/></td>
                    <td><input type='number' ref='editStorage'defaultValue={products.Storage}/></td>
                    <td><input type='number' ref='editStock'defaultValue={products.Stock}/></td>

                    <td>
                        <input type='button' onClick={()=>this.onSaveBtnClick(products.idproducts)} value='Save'/>
                        <input type='button' onClick={this.onCancelBtnClick} value='Cancel'/>
                    </td>
                </tr>
                )
            }
            return(
                <tr key={key}>
                    <td>{products.idproducts}</td>
                    <td>{products.ProductName}</td>
                    <td>Rp.{products.ProductPrice}</td>
                    <td>{products.Category}</td>
                    <td>{products.Description}</td>
                    <td>{products.RAM}</td>
                    <td>{products.Storage}</td>
                    <td>{products.Stock}</td>

                    <td>
                        <input type='button' onClick={()=>this.onEditBtnCLick(products.idproducts)} value='Edit'/>
                        <input type='button' onClick={()=>this.onDeleteBtnCLick(products.idproducts)} value='Delete'/>
                    </td>
                </tr>
            )
        })
        return arrJSX;
    }

    renderOptionCategory = () => {
        const arrJSX = this.state.products.map((data, key)=>{
            return(
                <option key={key} value={data.idCategory}>{data.Category}</option>
            )
        })
        return arrJSX;
    }

    render() {
        console.log(this.props.admin.username)
        // if(this.props.admin.username !== ""){
            return (
                <div>

                    <br/>
                    <br/>
                    <br/>
                
                <table  responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ProductName</th>
                            <th>ProductPrice</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>RAM</th>
                            <th>Storage</th>
                            <th>Stock</th>
                            <th>Edit</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.renderTabelProduct()}
                        <th></th>
                    </tbody>

                    <tfoot >
                        <td></td>
                        <td><input id='1' type='text' ref='AddProductName'/></td>
                        <td><input id='2'type='number' ref='AddProductPrice'/></td>
                        <td>
                            {/* <select id='3'ref='AddCategory'>
                                <option value=''>Pilih Category</option>
                                {this.renderOptionCategory()}
                            </select> */}
                        </td>
                        <td><input id='4'type='text' ref='AddDescription' /></td>
                        <td><input id='5'type='number' ref='AddRAM'/></td>
                        <td><input id='6'type='number' ref='AddStorage'/></td>
                        <td><input id='7'type='number' ref='AddStock'/></td>
                        <td>
                            <input type='button' onClick={this.onAddBtnClick} value='add'/>
                        </td>

                    </tfoot>
                </table> 
                </div>
            )
        // }
        // return <Redirect to="/"/>
    }
}

const mapStateToProps = (state) => {
    return { admin: state.admin };
}
export default connect(mapStateToProps)(Dashboard);