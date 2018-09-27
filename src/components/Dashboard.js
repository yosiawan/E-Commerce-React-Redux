import React, {Component} from 'react';
import Axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';


class Dashboard extends Component {
    state={products:[], editedItemID:0};

    componentWillMount(){
        Axios.get("http://localhost:1002/products")
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

    //Bisa langsung search di state kalau data sudah ada di state
    // onSearchBtnClick = () => {
    //     console.log(this.refs.cabangSearch.value)
    //     Axios.get('http://localhost:1001/searchKaryawan', {
    //         params:{
    //             Nama: this.refs.NamaSearch.value,
    //             JenisKelamin: this.refs.kelaminSearch.value,
    //             Gaji: this.refs.gajiSearch.value,
    //             Cabang: this.refs.cabangSearch.value,
    //             Jabatan: this.refs.jabatanSearch.value
    //         }
    //     })
    //     .then((res)=>{
    //         this.setState({listKaryawan: res.data})
    //     }).catch((err)=>{
    //         console.log(err);
    //     })
    // }

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
            //fill with details
            ProductName: this.refs.AddProductName.value,
            ProductPrice: this.refs.AddProductPrice.value,
            Category: this.refs.AddCategory.value
        }).then((res)=>{
            alert(res.data);
            this.setState({products: res.data});
            console.log(res.data)
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
        Axios.put(`http://localhost:1002/products/${id}`, {
            //fill with details
            ProductName: this.refs.editNama.value,
            ProductPrice: this.refs.editPrice.value,
            Category: this.refs.editCategory.value
        }).then((res)=>{
            alert('edit sakses');
            this.setState({products: res.data, editedItemID:0});
            console.log(res.data)
        }).catch((err)=>{
            alert('Error');
            console.log(err)
        })
    }

    // Code below is just for structural guidance
    renderTabelProduct = () => {
        // console.log('render karyawan berjalan')
        const arrJSX = this.state.products.map((products, key)=>{
            // console.log(this.state.editedItemID)
            if(this.state.editedItemID == products.idproducts){
                return(
                    <tr key={key}>
                    <td>{products.idproducts}</td>
                    <td><input type='text' ref='editNama' defaultValue={products.ProductName}/></td>
                    <td>Rp.<input type='number' ref='editPrice'defaultValue={products.ProductPrice}/></td>
                    <td>
                        <select ref='editCategory' >
                            <option defaultValue={products.idCategory}>Pilih Category</option>
                            {this.renderOptionCategory()}
                        </select>
                    </td>
                    <td>
                        <input type='button' onClick={()=>this.onSaveBtnClick(products.idproducts)} value='Save'/>
                        <input type='button' onClick={this.onCancelBtnClick} value='Cancel'/>
                    </td>
                </tr>
                )
            }
            return(
                <tr key={key}>
                    <td>{products.id}</td>
                    <td>{products.ProductName}</td>
                    <td>Rp.{products.ProductPrice}</td>
                    <td>{products.Category}</td>
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
        // console.log('render cabang berjalan')
        const arrJSX = this.state.products.map((data, key)=>{
            // console.log(cabang)
            return(
                <option key={key} value={data.idCategory}>{data.Category}</option>
            )
        })
        return arrJSX;
    }

    // renderOptionCabangSearch = () => {
    //     // console.log('render cabang berjalan')
    //     const arrJSX = this.state.listCabang.map((cabang, key)=>{
    //         // console.log(cabang)
    //         return(
    //             <option key={key} value={cabang.Kota}>{cabang.Kota}</option>
    //         )
    //     })
    //     return arrJSX;
    // }
    // structural guidance ends here

    render() {
        console.log(this.props.admin.username)
        // if(this.props.admin.username !== ""){
            return (
                <div>

                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    {/* <div>
                    <label>Cabang : </label> 
                    <select ref='cabangSearch'>
                        <option value=''>Pilih Cabang</option>
                        {this.renderOptionCabangSearch()}
                    </select>

                    <label>Nama : </label> 
                    <input type="text" ref="NamaSearch"/>

                    <label>Jenis Kelamin : </label> 
                    <input type='text' ref='kelaminSearch' />

                    <label>Jabatan : </label> 
                    <input type='text' ref='jabatanSearch'/>

                    <label>Gaji : </label> 
                    <input type='number' ref='gajiSearch'/>
                </div>
                <input type='button' onClick={this.onSearchBtnClick} value='Search'/> */}

                <table className='table striped condensed responsive' responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ProductName</th>
                            <th>ProductPrice</th>
                            <th>Category</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTabelProduct()}
                        <th></th>
                    </tbody>
                    <tfoot>
                        <td></td>
                        <td><input type='text' ref='AddProductName'/></td>
                        <td><input type='number' ref='AddProductPrice'/></td>
                        <td>
                            <select ref='AddCategory'>
                                <option value=''>Pilih Category</option>
                                {this.renderOptionCategory()}
                            </select>
                        </td>
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