import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import AddToCartReducer from './AddToCartReducer';
import CategoryReducer from './CategoryReducer';
import searchReducer from './searchReducer';
import AdminReducer from './AdminReducer';

export default combineReducers({
    auth: AuthReducer,
    admin: AdminReducer,
    Cart: AddToCartReducer,
    categoryList: CategoryReducer,
    searchResult: searchReducer
});
