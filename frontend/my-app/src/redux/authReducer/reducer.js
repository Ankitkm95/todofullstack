import * as types from "./actionType";

const initialState = {
    isLogin: false,
    isLoading: false,
    isError: false,
    userDetail:{},
    token:"",
};


const authReducer = (oldState = initialState, action) => {
    const {type, payload} = action;

    switch(type){
        case types.USER_LOGIN_REQUEST:{
            return {
                ...oldState,isLogin: false, isLoading:true, isError: false, userDetail: {}, token: ""
            }
        }
        case types.USER_LOGIN_SUCCESS:{
            console.log("click", payload.userDetails, payload.token, payload)
            return {
                ...oldState,isLogin: true, isLoading:false, isError: false, userDetail: payload.userDetails, token: payload.token}
        }
        case types.USER_LOGIN_FAILURE:{
            return {
                ...oldState,isLogin: false, isLoading:false, isError: true, userDetail: {}, token: ""
            }
        }
        case "Init_Action":{
            return {...initialState}
        }
        default:{
            return oldState;
        }
    }
};

export {authReducer};