import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { onLogout, keepLogin, cookieChecked, onAdminLogout, keepAdminLogin, cookieAdminChecked, productSearch } from '../actions';
import Axios from 'axios';

const cookies = new Cookies();

class Header extends Component {

    state={ categoryList:[] }
    
    componentWillMount() {
        const cookieNya = cookies.get('LoggedInUser');
        console.log(cookieNya);
        if(cookieNya !== undefined) {
            console.log(cookieNya !== undefined)
            this.props.keepLogin(cookieNya);
        }
        else {
            this.props.cookieChecked();
        }
        this.getRenderCategory()
        const cookieNyaAdmin = cookies.get('LoggedInAdmin');
        // console.log(cookieNyaAdmin);
        if(cookieNyaAdmin !== undefined) {
            this.props.keepAdminLogin(cookieNyaAdmin);
        }
        else {
            this.props.cookieAdminChecked();
        }
        this.getRenderCategory()
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

    onSearchBtnClick=()=>{
        // console.log(this.refs.search.value)
        this.props.productSearch(this.refs.search.value)
        console.log(this.props.searchResult.searchResult)
    }
    selectedCategory(id){
        cookies.set('SelectedCategory', id, { path: '/' });
    }

    onLogOutClick = () => {
        this.props.onLogout();
        cookies.remove('LoggedInUser');
    }

    onAdminLogOutClick = () => {
        this.props.onAdminLogout();
        cookies.remove('LoggedInAdmin');
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
                // console.log(data.Category)
                // console.log('mapping render berjalan')
                return(
                    <MenuItem href='/categoryPage' onClick={()=>this.selectedCategory(data.idCategory)}>
                        {data.Category}
                    </MenuItem>
                )
            })
        )
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
                        <a href="/">
                            Xiaomai
                        </a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown  title="Categories" id="basic-nav-dropdown">
                            {this.renderCategory()}
                            <MenuItem divider />
                            <MenuItem>Kutang</MenuItem>
                        </NavDropdown>
                        <NavItem>
                            <input ref='search' type='text' placeholder='Product Name'/>
                            <input type='button' value='Search'/>
                        </NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavDropdown title={"Hello, " + this.props.auth.username} id="basic-nav-dropdown">
                            <NavItem>
                                <Link to="/cart">
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
                        <a href="/">
                            Xiaomai
                        </a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown  title="Categories" id="basic-nav-dropdown">
                            {this.renderCategory()}
                            <MenuItem divider />
                            <MenuItem>Kutang</MenuItem>
                        </NavDropdown>
                        <NavItem>
                            <input ref='search' type='text' placeholder='Product Name'/>
                            <input type='button' value='Search'/>
                        </NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavDropdown title={"Hello, Admin " + this.props.admin.username} id="basic-nav-dropdown">
                            <NavItem href="/admin">
                                Dashboard
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
                    <a href="/">
                        Xiaomai
                    </a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavDropdown title="Categories" id="basic-nav-dropdown">
                        {this.renderCategory()}
                    </NavDropdown>
                    <NavItem>
                        <input ref='search' type='text' placeholder='Product Name'/>
                        <input onClick={this.onSearchBtnClick} type='button' value='Search'/>
                    </NavItem>
                </Nav>
                <Nav pullRight>
                    <NavDropdown title="Login" id="basic-nav-dropdown">
                        <MenuItem href="/login">Login as User</MenuItem>
                        <MenuItem divider />
                        <MenuItem href="/adminlogin">Login as Admin</MenuItem>
                    </NavDropdown>
                    <NavDropdown title="Register" id="basic-nav-dropdown">
                        <MenuItem href="/register">Register as User</MenuItem>
                        <MenuItem divider />
                        <MenuItem href="/adminregister">Register as Admin</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>);
    }
    render() {
        // console.log(typeof(this.props.searchResult.searchResult) !== 'string')
        if(this.props.searchResult.searchResult == null){
            return( 
                this.renderNavbar()
            );
        }
        return <Redirect to="/searchResult"/>
        
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;
    const admin = state.admin
    const searchResult = state.searchResult
    return { auth, admin, searchResult};
}

export default connect(mapStateToProps, { onLogout, keepLogin, cookieChecked,onAdminLogout, keepAdminLogin, cookieAdminChecked, productSearch})(Header);
