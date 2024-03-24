import axios from "axios";
import * as types from "./actionType";

const getTasks = (dispatch) => {
    dispatch({type: types.GET_TASK_REQUEST});

    return axios.get(`${process.env.REACT_APP_BASE_URL}/todo`).then(res => {
        //console.log(res)
        dispatch({type: types.GET_TASK_SUCCESS, payload: res?.data});
    }).catch(err => {
        dispatch({type: types.GET_TASK_FAILURE});
    })
};

const deleteTask = ({id, token}) => (dispatch) => {
    dispatch({type: types.GET_TASK_REQUEST});

    return axios.delete(`${process.env.REACT_APP_BASE_URL}/todo/${id}`, {headers:{'Authorization': `Bearer ${token}`}}).then(res => {
        dispatch({type: types.DELETE_TASK_SUCCESS})
    }).catch(err => {
        dispatch({type: types.GET_TASK_FAILURE})
    })
};

const updateTodo = ({id, payload, token}) =>(dispatch)=> {
    dispatch({type: types.GET_TASK_REQUEST});

    return axios.delete(`${process.env.REACT_APP_BASE_URL}/todo/${id}`,payload, {headers:{'Authorization': `Bearer ${token}`}}).then(res => {
        dispatch({type: types.UPDATE_TASK_SUCCESS})
    }).catch(err => {
        dispatch({type: types.GET_TASK_FAILURE});
    })
}

const addTodo = ({payload, token}) => (dispatch)=>{
    dispatch({type: types.GET_TASK_REQUEST});

    return axios.post(`${process.env.REACT_APP_BASE_URL}/todo`,payload, {headers:{'Authorization': `Bearer ${token}`}}).then(res =>{
        dispatch({type: types.POST_TASK_SUCCESS})
    }).catch(err => {
        dispatch({type: types.GET_TASK_FAILURE});
    })
}

export {
    getTasks,
    deleteTask,
    updateTodo,
    addTodo
}