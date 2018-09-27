const INITIAL_STATE = { categoryList: "" };
    
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "Get Categories Success" :
            return action.payload;
        default :
            return state;
    }
}

    