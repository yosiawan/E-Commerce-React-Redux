import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { onLogout, keepLogin, cookieChecked, onAdminLogout, keepAdminLogin, cookieAdminChecked, productSearch } from '../actions';
import Axios from 'axios';

const cookies = new Cookies();

class Header extends Component {

    state={ categoryList:[], brandList:[] }
    
    componentWillMount() {
        this.getRenderCategory()
        this.getBrands()

        const cookieNya = cookies.get('LoggedInUser');
        if(cookieNya !== undefined) {
            this.props.keepLogin(cookieNya);
        }
        else {
            this.props.cookieChecked();
        }
        
        const cookieNyaAdmin = cookies.get('LoggedInAdmin');
        if(cookieNyaAdmin !== undefined) {
            this.props.keepAdminLogin(cookieNyaAdmin);
        }
        else {
            this.props.cookieAdminChecked();
        }
        // this.getRenderCategory()
    }

    // componentWillReceiveProps(newProps) {
    //     console.log(newProps)
    //     if(newProps.auth.username === "") {
    //         console.log("masuk pak eko")
    //         cookies.remove('LoggedInUser');
    //     }
    //     if(newProps.admin.username === "") {
    //         cookies.remove('LoggedInAdmin');
    //     }
    // }

    // componentWillReceiveProps(newProps) {
    //         console.log(newProps)
    //         if(this.props.searchResult.searchResult !== null){
    //             return <Redirect to='/searchResult'/>
    //         }
    //     }

    onLogOutClick = () => {
        this.props.onLogout();
        cookies.remove('LoggedInUser');
    }

    onAdminLogOutClick = () => {
        this.props.onAdminLogout();
        cookies.remove('LoggedInAdmin');
    }
        
    selectedCategory(id){
        cookies.set('SelectedCategory', id, { path: '/' });
    }

    selectedBrand(id){
        cookies.set('SelectedBrand', id, { path: '/' });
    }

    getRenderCategory(){
        Axios.get('http://localhost:1002/categories')
        .then(ok=>{
            // console.log(ok.data)
            this.setState({categoryList : ok.data})
            // console.log(this.state.categoryList)
        }).catch(err=>{
            console.log('render kategori gagal')
            // console.log(err)
        })
    }

    renderCategory(){
        return(
            this.state.categoryList.map(data=>{
                console.log(data.Category)
                console.log(data.idCategory)

                // console.log('mapping render berjalan')
                return(
                    <MenuItem onClick={()=>this.selectedCategory(data.idCategory)}>
                        <Link to='/categoryPage'>
                            {data.Category}
                        </Link>
                    </MenuItem>
                )
            })
        )
    }

    getBrands(){
        Axios.get('http://localhost:1002/brands')
        .then(ok=>{
            // console.log(ok.data)
            this.setState({brandList : ok.data})
            // console.log(this.state.categoryList)
        }).catch(err=>{
            console.log('render brands gagal')
            // console.log(err)
        })
    }

    renderBrands(){
        return this.state.brandList.map(data=>{
            return(
                <MenuItem onClick={()=>this.selectedBrand(data.idBrand)}>
                    <Link to='/brandPage'>
                        {data.Brand}
                    </Link>
                </MenuItem>
            )
        })
    }

    // Kalau ada masalah dengan routing / otentikasi page, cek apakah menggunakan <Link> atau href='/', 
    // metode href='/' + <MenuItem> tdk dapat digunakan pada bagian dashboard
    // Proteksi page membutuhkan <Link> JANGAN pakai metode href
    renderNavbar = () => {
        // console.log(this.props.auth)
        if(this.props.auth.username !== "") {
            return (<Navbar fixedTop={true} collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand >
                        <Link to='/'>
                            Xiao mai
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown  title="Categories" id="basic-nav-dropdown">
                            {this.renderCategory()}
                        </NavDropdown>
                        <NavDropdown  title="Brands" id="basic-nav-dropdown">
                            {this.renderBrands()}
                        </NavDropdown>
                        <NavItem>
                            <input ref='Search' type='text'/>
                        </NavItem>
                        <NavItem onClick={()=>this.props.productSearch(this.refs.Search.value)} >
                            <Link to='/searchResult'>
                                Search
                            </Link>
                        </NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavDropdown title={"Hello, " + this.props.auth.username} id="basic-nav-dropdown">
                            <NavItem >
                                <Link to="/checkoutPage" >
                                    Cart
                                </Link>
                            </NavItem>
                            <MenuItem divider />
                            <MenuItem onSelect={this.onLogOutClick}>Log Out</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>);
        } else if(this.props.admin.username !== "") {
            return (<Navbar fixedTop={true} collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand >
                        <Link to='/'>
                            Xiao mai
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown  title="Categories" id="basic-nav-dropdown">
                            {this.renderCategory()}
                        </NavDropdown>
                        <NavDropdown  title="Brands" id="basic-nav-dropdown">
                            {this.renderBrands()}
                        </NavDropdown>
                        <NavItem>
                            <input ref='Search' type='text' />
                        </NavItem>
                        <NavItem onClick={()=>this.props.productSearch(this.refs.Search.value)} >
                            <Link to='/searchResult'>
                            <Link to ></Link>

                                Search
                            </Link>
                        </NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavDropdown title={"Hello, Admin " + this.props.admin.username} id="basic-nav-dropdown">
                            <NavItem >
                                <Link to="/admin" >
                                    Dashboard
                                </Link>
                            </NavItem>
                            <MenuItem divider />
                            <MenuItem onSelect={this.onAdminLogOutClick}>Log Out Admin</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>);
        }

        return (
        <Navbar fixedTop={true} collapseOnSelect>
            <Navbar.Header >
                <Navbar.Brand >
                    <Link to='/'>
                        Xiao mai
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavDropdown title="Categories" id="basic-nav-dropdown">
                        {this.renderCategory()}
                    </NavDropdown>
                    <NavDropdown  title="Brands" id="basic-nav-dropdown">
                        {this.renderBrands()}
                    </NavDropdown>
                    <NavItem>
                        <input ref='Search' type='text' />
                    </NavItem>
                    <NavItem onClick={()=>this.props.productSearch(this.refs.Search.value)} >
                        <Link to='/searchResult'>
                            Search
                        </Link>
                    </NavItem>
                </Nav>
                <Nav pullRight>
                    <NavDropdown title="Login" id="basic-nav-dropdown">
                        <MenuItem >
                            <Link to="/login" >
                                Login as User
                            </Link>
                        </MenuItem>
                        <MenuItem divider />
                        <MenuItem >
                            <Link to="/adminlogin" >
                                Login as Admin
                            </Link>
                        </MenuItem>
                    </NavDropdown>
                    <NavDropdown title="Register" id="basic-nav-dropdown">
                        <MenuItem >
                            <Link to="/register" >
                                Register as User
                            </Link>
                        </MenuItem>
                        <MenuItem divider />
                        <MenuItem >
                            <Link to="/adminregister" >
                                Register as Admin
                            </Link>
                        </MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        );
    }
    render() {
        // console.log(typeof(this.props.searchResult.searchResult) !== 'string')
            return( 
                <div>
                    {this.renderNavbar()}
                </div>
            );
            
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;
    const admin = state.admin
    const searchResult = state.searchResult
    return { auth, admin, searchResult};
}

export default connect(mapStateToProps, { onLogout, keepLogin, cookieChecked,onAdminLogout, keepAdminLogin, cookieAdminChecked, productSearch})(Header);
