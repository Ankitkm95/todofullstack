import * as types from "./actionType";

const initState = {
    isLoading: false,
    isError: false,
    todos: [],
    currentTodo:{}
};

const todoReducer = (oldState = initState, action) => {
    const {type, payload} = action
    switch(type){
        case types.GET_TASK_REQUEST:{
            return {
                ...oldState, isLoading: true, isError: false
            }
        }
        case types.GET_TASK_SUCCESS:{
            return {
                ...oldState, isLoading: false,isError:false, todos: payload
            }
        }
        case types.GET_TASK_FAILURE:{
            return {
                ...oldState, isLoading: false, isError: true
            }
        }
        case types.POST_TASK_SUCCESS:{
            return {...oldState, isLoading: false}
        }
        case types.UPDATE_TASK_SUCCESS:{
            return {...oldState, isLoading: false}
        }
        case types.DELETE_TASK_SUCCESS:{
            return {...oldState, isLoading: false}
        }
        default:{
            return {...oldState}
        }
    }
};

export {
    todoReducer
}