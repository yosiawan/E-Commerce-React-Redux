const INITIAL_STATE = { brandList: "", err: '' };
    
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "Get Brand Success" :
            return action.payload;
        case "Get Brand Failed" :
            return action.payload;
        default :
            return state;
    }
}