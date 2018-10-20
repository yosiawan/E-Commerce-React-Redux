import React, { Component } from 'react';
import { Nav, 
    Navbar, 
    NavItem, 
    NavDropdown, 
    MenuItem 
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { 
    selectBrand, 
    selectCategory, 
    onLogout, 
    keepLogin, 
    cookieChecked, 
    onAdminLogout, 
    keepAdminLogin, 
    cookieAdminChecked, 
    productSearch 
} from '../actions';

const cookies = new Cookies();

class Header extends Component {

    state={ categoryList:[], brandList:[] }
    
    componentWillMount() {
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
    }

    onLogOutClick = () => {
        this.props.onLogout();
        cookies.remove('LoggedInUser');
    }

    onAdminLogOutClick = () => {
        this.props.onAdminLogout();
        cookies.remove('LoggedInAdmin');
    }

    renderCategory(){
        // console.log(this.props.Category.categoryList)
        if (this.props.Category.categoryList == ""){
            return <h4>Please Wait . . .</h4>
        }
        return(
            this.props.Category.categoryList.map(data=>{
                // console.log(data)
                return(
                    <MenuItem onClick={()=>this.props.selectCategory(data.idCategory)}>
                        <Link to={`/categoryPage?idCategory${data.idCategory}`}>
                            {data.Category}
                        </Link>
                    </MenuItem>
                )
            })
        )
    }

    renderBrands(){
        // console.log(this.props.Brand.brandList)
        if(this.props.Brand.brandList == ""){
            return <h4>Please Wait . . .</h4>
        }
        return this.props.Brand.brandList.map(data=>{
            // console.log(data)
            return(
                <MenuItem onClick={()=>this.props.selectBrand(data.idbrand)}>
                    <Link to={`/brandPage?idbrand=${data.idbrand}`}>
                        {data.Brand}
                    </Link>
                </MenuItem>
            )
        })
    }

    renderNavbar = () => {
        // console.log(this.props.auth)
        if(this.props.auth.username !== "") {
            return (
                <Nav pullRight>
                    <NavDropdown title={"Hello, " + this.props.auth.username} id="basic-nav-dropdown">
                        <NavItem >
                            <Link to="/checkoutPage" >
                                Cart
                            </Link>
                        </NavItem>
                        <NavItem >
                            <Link to="/userTransactionHistory" >
                                Transaction History
                            </Link>
                        </NavItem>
                        <MenuItem divider />
                        <MenuItem onSelect={this.onLogOutClick}>Log Out</MenuItem>
                    </NavDropdown>
                </Nav>
            );
        } else if(this.props.admin.username !== "") {
            return (
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
            )
        } else return (
            <Nav pullRight>
                <NavDropdown title="Login or Register" id="basic-nav-dropdown">
                    <MenuItem >
                        <Link to="/login" >
                            Login
                        </Link>
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem >
                        <Link to="/register" >
                            Register
                        </Link>
                    </MenuItem>
                </NavDropdown>
            </Nav>
        );
    }
    render() {
            return( 
                <div>
                    <Navbar fixedTop={true} collapseOnSelect>
                        <Navbar.Header >
                            <Navbar.Brand >
                                <Link style={{color:'#449d44'}} to='/'>
                                    XMX
                                </Link>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav>
                                <NavDropdown title="Categories" id="basic-nav-dropdown">
                                    {this.renderCategory()}
                                </NavDropdown>
                                <NavDropdown title="Brands" id="basic-nav-dropdown">
                                    {this.renderBrands()}
                                </NavDropdown>
                                <NavItem>
                                    <input ref='Search' type='text' defaultValue='' />
                                </NavItem>
                                <NavItem onClick={()=>this.props.productSearch(this.refs.Search.value)} >
                                    {/* <Link to={`/searchResult?search=${this.refs.Search.value}`}>
                                        Search
                                    </Link> */}
                                </NavItem>
                            </Nav>
                            {this.renderNavbar()}
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            );
            
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;
    const admin = state.admin
    const searchResult = state.searchResult
    const Brand = state.Brand
    const Category = state.Category
    const Select = state.Select
    return { auth, admin, searchResult, Brand, Category, Select};
}

export default connect(mapStateToProps, { onLogout, keepLogin, cookieChecked,onAdminLogout, keepAdminLogin, cookieAdminChecked, productSearch, selectCategory, selectBrand})(Header);
