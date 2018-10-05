import axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl';


export const getAllProduct=()=>{
    return (dispatch)=>{
        axios.get('http://localhost:1002/products')
        .then(ok=>{
            dispatch({
                type: "Get All Product Success",
                payload: {productList: ok.data}
            })
        }).catch(err=>{
            dispatch({
                type: "Get All Product Error",
                payload: {err: 'Error'}
            })
        })
    }
}