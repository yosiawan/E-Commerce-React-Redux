const INITIAL_STATE = { username: "", error: "", cookieCheck: false};
    
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "USER_LOGIN_SUCCESS" :
            return action.payload;
        case "USER_LOGIN_FAIL" :
            return { ...state, error: "Authentication Error" };
        case "Username already exists" :
            return { ...state, error: "Username already exists" };
        case "USER_LOGOUT" :
            return INITIAL_STATE;
        case "COOKIES_CHECKED" :
            return { ...state, cookieCheck: true };
        default :
            return state;
    }
}

    