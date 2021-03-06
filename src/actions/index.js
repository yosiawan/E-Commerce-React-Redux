import axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl';

export const onLogin = (user) => {
    return(dispatch) => {
        axios.get(API_URL_1 + 'login', {
            params: {
                username: user.username,
                password: user.password
            }
        }).then(user => {
            dispatch({
                type: "USER_LOGIN_SUCCESS", 
                payload: { username: user.data[0].username, address: user.data[0].address, error: "" }
            });
            dispatch({
                type: "COOKIES_CHECKED"
            });
        }).catch(err => {
            console.log(err);
            dispatch({
                type: "USER_LOGIN_FAIL"
            });
        })
    }
};

export const keepLogin = (username) => {
    return(dispatch) => {
        axios.get(API_URL_1 + 'keepLogin', {
            params: {
                username: username
            }
        }).then(user => {
            console.log(user)
            dispatch({
                type: "USER_LOGIN_SUCCESS", 
                payload: { username: user.data[0].username, address: user.data[0].address, error: "" }
            });
            dispatch({
                type: "COOKIES_CHECKED"
            });
        }).catch(err => {
            console.log(err);
            dispatch({
                type: "USER_LOGIN_FAIL"
            });
        })
    }
};

export const onLogout = () => {
    return {
        type: "USER_LOGOUT"
    };
}

export const cookieChecked = () => {
    return {
        type: "COOKIES_CHECKED"
    };
}

export const onRegister = (user) => {
    return (dispatch) => {
        axios.post(API_URL_1 + 'register', user)
        .then((res) => {
            if(res.data == "Username already exists"){
                dispatch({
                    type:"Username already exists",
                })
            }
            else{
                dispatch({
                    type: "USER_LOGIN_SUCCESS", 
                    payload: { username: res.data, error: "" }
                })
            };
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

export const addToCart = (product) => {
    // console.log(product)
    return{
        type:"Product_Selected",
        payload : { product }
    }    
}

export const getCategories = () => {
    console.log('data di get')
    return(dispatch) => {
        axios.get(API_URL_1 + 'categories')
        .then(ok=>{
            // console.log(ok.data)
            dispatch({
                type: "Get Categories Success",
                payload: {categoryList: ok.data}
            })
        }).catch(err=>{
            console.log('get kategori gagal')
            console.log(err)
        })
    }
};

export const getBrands = () => {
    console.log('Brands di get')
    return(dispatch) => {
        axios.get(API_URL_1 + 'brands')
        .then(ok=>{
            // console.log(ok.data)
            dispatch({
                type: "Get Brand Success",
                payload: {brandList: ok.data}
            })
        }).catch(err=>{
            dispatch({
                type: "Get Brand Failed",
                payload: {brandList: [], err: 'Get Brand Failed'}
            })
            console.log('get kategori gagal')
            console.log(err)
        })
    }
};

// ===================== Search Related ======================================
export const productSearch = (search) => {
    console.log('action creator search berjalan')
    return(dispatch)=>{
        axios.get(API_URL_1 + 'search',{
            params:{ProductName: search}
        }).then((ok)=>{
            if(ok.status == 200 && ok.data.length == 0){
                console.log("Product Not Found")
                dispatch({
                    type: "Product Not Found",
                    payload: {searchResult:[], err:"Product Not Found"}
                })
            }else if(ok.data.length > 0){
                // console.log(ok.data)
                dispatch({
                    type: "Search Success",
                    payload: {searchResult: ok.data}
                })
            }
        }).catch(err=>{
            dispatch({
                type: "Search Failed",
                payload: {searchResult :[], err: "Search Error"}
            })
            console.log('search gagal')
            console.log(err)
        })
    }
}

export const filteredSearch = (parameter) => {
    console.log('filter berjalan')

    return(dispatch) => {
        axios.post(API_URL_1 + `searchFilter`, parameter)
        .then(ok => {
            if(ok.status == 200 && ok.data.length == 0){
                console.log("Product Not Found")
                dispatch({
                    type: "Product Not Found",
                    payload: {searchResult:[], err:"Product Not Found"}
                })
            }else if(ok.data.length > 0){
                console.log(ok.data)
                dispatch({
                    type: "Search Success",
                    payload: {searchResult: ok.data}
                })
            }
        }).catch(err=>{
            dispatch({
                type: "Search Failed",
                payload: {searchResult :[], err: "Search Error"}
            })
            console.log('search gagal')
            console.log(err)
        })
    }
}

// ========================== Admin Login =========================================
export const onAdminLogin = (user) => {
    return(dispatch) => {
        axios.get(API_URL_1 + 'adminlogin', {
            params: {
                username: user.username,
                password: user.password
            }
        }).then(user => {
            dispatch({
                type: "ADMIN_LOGIN_SUCCESS", 
                payload: { username: user.data[0].username, email: user.data[0].email, error: "" }
            });
            dispatch({
                type: "COOKIES_CHECKED"
            });
        }).catch(err => {
            console.log(err);
            dispatch({
                type: "ADMIN_LOGIN_FAIL"
            });
        })
    }
};

export const keepAdminLogin = (username) => {
    return(dispatch) => {
        axios.get(API_URL_1 + 'adminkeepLogin', {
            params: {
                username: username
            }
        }).then(user => {
            // console.log(user)
            dispatch({
                type: "ADMIN_LOGIN_SUCCESS", 
                payload: { username: user.data[0].username, error: "" }
            });
            dispatch({
                type: "COOKIES_CHECKED"
            });
        }).catch(err => {
            console.log(err);
            dispatch({
                type: "ADMIN_LOGIN_FAIL"
            });
        })
    }
};

export const onAdminLogout = () => {
    return {
        type: "ADMIN_LOGOUT"
    };
}

export const cookieAdminChecked = () => {
    return {
        type: "COOKIES_CHECKED"
    };
}

export const onAdminRegister = (user) => {
    return (dispatch) => {
        axios.post(API_URL_1 + 'adminregister', user)
        .then((res) => {
            if(res.data == "Username already exists"){
                dispatch({
                    type:"Admin already exists",
                })
            }
            else {
                dispatch({
                    type: "ADMIN_LOGIN_SUCCESS", 
                    payload: { username: res.data.username,  error: "" }
                });
            } 
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

// ================ Selection ====================
export const selectCategory = (idCategory) => {
    console.log(idCategory)
    return(dispatch)=>{
        dispatch({
            type: "Category Selected",
            payload: {selectedCategory: idCategory}
        })
    }
}

export const selectBrand = (idBrand) => {
    console.log(idBrand)
    return(dispatch)=>{
        dispatch({
            type: "Brand Selected",
            payload: {selectedBrand: idBrand}
        })
    }
}

export const selectProduct = (idProduct) => {
    console.log(idProduct)
    return(dispatch)=>{
        dispatch({
            type: "Product Selected",
            payload: {selectedProduct: idProduct}
        })
    }
}
// ===============================================