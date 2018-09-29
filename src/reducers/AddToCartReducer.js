const INITIAL_STATE = [ {item: 'empty'}];
    
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "Product_Selected" :
            return action.payload;
        default :
            return state;
    }
}