const INITIAL_STATE = [
    {id:1, name:'Laptop 1', price:'25000'},
    {id:2, name:'Laptop 2', price:'35000'},
    {id:3, name:'Laptop 3', price:'45000'},

];
    
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "Product_Selected" :
            console.log(action.payload)
            return action.payload;
        default :
            return state;
    }
}