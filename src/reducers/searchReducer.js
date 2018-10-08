const INITIAL_STATE = { searchResult: null, err: 'Search Your Desired Product'};
    
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "Search Success" :
            return action.payload;
        case "Search Failed" :
            return action.payload;
        case "Product Not Found" :
            return action.payload;
        default :
            return state;
    }
}

    