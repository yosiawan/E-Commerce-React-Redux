const INITIAL_STATE = { username: "", email: "", error: "", cookieCheck: false};
    
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "ADMIN_LOGIN_SUCCESS" :
            return action.payload;
        case "ADMIN_LOGIN_FAIL" :
            return { ...state, error: "Authentication Error" };
        case "Admin already exists" :
            return { ...state, error: "Admin already exists" };
        case "ADMIN_LOGOUT" :
            return INITIAL_STATE;
        case "COOKIES_CHECKED" :
            return { ...state, cookieCheck: true };
        default :
            return state;
    }
}

    