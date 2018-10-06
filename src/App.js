import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';
import ProductDetails from './components/ProductDetails';
import Axios from 'axios';
import { onLogout, keepLogin, cookieChecked, getCategories, getBrands } from './actions';
import {getAllProduct} from './actions/Product'
import { connect } from 'react-redux';
import CategoryPage from './components/CategoryPage';
import SearchResult from './components/SearchResult';
import AdminLoginPage from './components/AdminLoginPage';
import AdminRegisterPage from './components/AdminRegisterPage';
import CheckoutPage from './components/CheckoutPage';
import BrandPage from './components/BrandPage';
import UserTransactionHistory from './components/UserTransactionHistory';
import Footer from './components/Footer';


class App extends Component {
    state={listKaryawan:[], listCabang:[], editedItemID:0, test:true};

    componentWillMount(){
        this.props.getAllProduct()
        this.props.getCategories()
        this.props.getBrands()
        // this.props.getCategories()
        // Axios.get('http://localhost:1001/Karyawan')
        // .then((res)=>{
        //     console.log(res.data);
        //     this.setState({listKaryawan:res.data.listKaryawan, listCabang:res.data.listCabang})
        //     console.log(this.state.listKaryawan)
        // })
    }

    // onEditBtnCLick=(id)=>{
    //     console.log(id)
    //     this.setState( {editedItemID: id} )
    //     console.log(this.state.editedItemID)
    // }

    // //Bisa langsung search di state kalau data sudah ada di state
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

    // onDeleteBtnCLick(idKaryawan){
    //     console.log(idKaryawan)
    //     if(window.confirm('Are You Sure You Want To Delete This Data?')){
    //         Axios.delete('http://localhost:1001/Karyawan/' + idKaryawan)
    //         .then((res)=>{
    //             alert('Delete Success');
    //             this.setState({listKaryawan: res.data})
    //         }).catch((err)=>{
    //             alert('Error');
    //             console.log(err)
    //         })
    //     }
    // }
    
    // onAddBtnClick = () => {
    //     Axios.post('http://localhost:1001/Karyawan', {
    //         nama: this.refs.Nama.value,
    //         JenisKelamin: this.refs.Gender.value,
    //         Jabatan: this.refs.Jabatan.value,
    //         Gaji: this.refs.Gaji.value,
    //         Cabang: this.refs.cabang.value
    //     }).then((res)=>{
    //         alert(res.data);
    //         this.setState({listKaryawan: res.data});
    //         console.log(res.data)
    //     }).catch((err)=>{
    //         alert('Error');
    //         console.log(err)
    //     })
    // }

    // onCancelBtnClick=()=>{
    //     this.setState({editedItemID: 0})
    //     console.log(this.state.editedItemID)
    // }

    // onSaveBtnClick=(id)=>{
    //     console.log(this.refs.editCabang.value)
    //     Axios.put(`http://localhost:1001/Karyawan/${id}`, {
    //         nama: this.refs.editNama.value,
    //         JenisKelamin: this.refs.editGender.value,
    //         Jabatan: this.refs.editJabatan.value,
    //         Gaji: this.refs.editGaji.value,
    //         Cabang: this.refs.editCabang.value
    //     }).then((res)=>{
    //         alert('edit sakses');
    //         this.setState({listKaryawan: res.data, editedItemID:0});
    //         console.log(res.data)
    //     }).catch((err)=>{
    //         alert('Error');
    //         console.log(err)
    //     })
    // }

    // renderTabelKaryawan = () => {
    //     // console.log('render karyawan berjalan')
    //     const arrJSX = this.state.listKaryawan.map((karyawan, key)=>{
    //         // console.log(this.state.editedItemID)
    //         if(this.state.editedItemID == karyawan.id){
    //             return(
    //                 <tr key={key}>
    //                 <td>{karyawan.id}</td>
    //                 <td><input type='text' ref='editNama' defaultValue={karyawan.Nama}/></td>
    //                 <td><input type='text' ref='editGender'defaultValue={karyawan.Gender}/></td>
    //                 <td><input type='text' ref='editJabatan'defaultValue={karyawan.Jabatan}/></td>
    //                 <td>Rp.<input type='number' ref='editGaji'defaultValue={karyawan.Gaji}/></td>
    //                 <td>
    //                     <select ref='editCabang' >
    //                         <option defaultValue={karyawan.idCabang}>Pilih Cabang</option>
    //                         {this.renderOptionCabang()}
    //                     </select>
    //                 </td>
    //                 <td>
    //                     <input type='button' onClick={()=>this.onSaveBtnClick(karyawan.id)} value='Save'/>
    //                     <input type='button' onClick={this.onCancelBtnClick} value='Cancel'/>
    //                 </td>
    //             </tr>
    //             )
    //         }
    //         return(
    //             <tr key={key}>
    //                 <td>{karyawan.id}</td>
    //                 <td>{karyawan.Nama}</td>
    //                 <td>{karyawan.Gender}</td>
    //                 <td>{karyawan.Jabatan}</td>
    //                 <td>Rp.{karyawan.Gaji}</td>
    //                 <td>{karyawan.Cabang}</td>
    //                 <td>
    //                     <input type='button' onClick={()=>this.onEditBtnCLick(karyawan.id)} value='Edit'/>
    //                     <input type='button' onClick={()=>this.onDeleteBtnCLick(karyawan.id)} value='Delete'/>
    //                 </td>
    //             </tr>
    //         )
    //     })
    //     return arrJSX;
    // }

    // renderOptionCabang = () => {
    //     // console.log('render cabang berjalan')
    //     const arrJSX = this.state.listCabang.map((cabang, key)=>{
    //         // console.log(cabang)
    //         return(
    //             <option key={key} value={cabang.idCabang}>{cabang.Kota}</option>
    //         )
    //     })
    //     return arrJSX;
    // }

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

    render() {
        // console.log("render dijalankan");
        return (
        <div className="App">
            <Header/>
            <div>
                <Route exact path="/" component={HomePage}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/adminlogin" component={AdminLoginPage}/>
                <Route path="/register" component={RegisterPage}/>
                <Route path="/adminregister" component={AdminRegisterPage}/>
                <Route path="/admin" component={Dashboard} />
                <Route path="/productDetails" component={ProductDetails}/>
                <Route path="/categoryPage" component={CategoryPage}/>
                <Route path="/searchResult" component={SearchResult}/>
                <Route path="/checkoutPage" component={CheckoutPage}/>
                <Route path="/brandPage" component={BrandPage}/>
                <Route path="/userTransactionHistory" component={UserTransactionHistory}/>
            <Footer/>
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
                <input type='button' onClick={this.onSearchBtnClick} value='Search'/>

                <table className='table striped condensed responsive' responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama</th>
                            <th>Jenis Kelamin</th>
                            <th>Jabatan</th>
                            <th>Gaji</th>
                            <th>Cabang</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTabelKaryawan()}
                        <th></th>
                    </tbody>
                    <tfoot>
                        <td></td>
                        <td><input type='text' ref='Nama'/></td>
                        <td><input type='text' ref='Gender'/></td>
                        <td><input type='text' ref='Jabatan'/></td>
                        <td><input type='number' ref='Gaji'/></td>
                        <td>
                            <select ref='cabang'>
                                <option value=''>Pilih Cabang</option>
                                {this.renderOptionCabang()}
                            </select>
                        </td>
                        <td>
                            <input type='button' onClick={this.onAddBtnClick} value='add'/>
                        </td>

                    </tfoot>
                </table> */}
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;
    const cart = state.cart;
    const categoryList = state.categoryList
    return { auth, cart, categoryList };
}

export default withRouter(connect(mapStateToProps, { onLogout, keepLogin, cookieChecked, getBrands, getCategories, getAllProduct})(App));
