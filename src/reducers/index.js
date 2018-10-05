import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import AddToCartReducer from './AddToCartReducer';
import CategoryReducer from './CategoryReducer';
import searchReducer from './searchReducer';
import AdminReducer from './AdminReducer';
import BrandReducer from './BrandReducer';
import ProductReducer from './ProductReducer';
import SelectionReducer from './SelectionReducer';

export default combineReducers({
    auth: AuthReducer,
    admin: AdminReducer,
    Cart: AddToCartReducer,
    Category: CategoryReducer,
    searchResult: searchReducer,
    Brand: BrandReducer,
    Product: ProductReducer,
    Select: SelectionReducer
});
