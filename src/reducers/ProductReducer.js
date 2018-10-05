const INITIAL_STATE = { productList: '', err: '' };
    
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "Get All Product Success" :
            return action.payload;
        case "Get All Product Error" :
            return action.payload;
        default :
            return state;
    }
}

    