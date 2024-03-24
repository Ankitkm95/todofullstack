import * as types from "./actionType";
import axios from "axios";

const userLoginRequestAction = () => ({type: types.USER_LOGIN_REQUEST});
const userLoginSuccessAction = (payload) => ({type: types.USER_LOGIN_SUCCESS, payload});
const userLoginFailureAction = () => ({type: types.USER_LOGIN_FAILURE});



const login = (payload) => (dispatch) => {
    dispatch(userLoginRequestAction());

    return axios({
        method: "post",
        url: "/login",
        baseURL: process.env.REACT_APP_BASE_URL,
        data: payload
    }).then(res => {
        const {msg, token, userDetails} = res.data;
        console.log(res.data);
        if(msg === "Login successfull"){
            console.log(token, userDetails)
           return dispatch(userLoginSuccessAction({token, userDetails}));
        }
    }).catch(err =>{
        return dispatch(userLoginFailureAction());
    })
};


export {login};