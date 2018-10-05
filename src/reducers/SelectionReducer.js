const INITIAL_STATE = { selectedCategory: '', selectedBrand: '', selectedProduct: '', searchedProduct: '' };
    
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "Category Selected" :
            return action.payload;
        case "Brand Selected" :
            return action.payload;
        case "Product Selected" :
            return action.payload;
        case "Search Selected":
            return action.payload;
        default :
            return state;
    }
}