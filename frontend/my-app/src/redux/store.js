import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import {thunk} from "redux-thunk";
import { authReducer } from "./authReducer/reducer";
import { todoReducer } from "./todoReducer/reducer";

const rootReducer = combineReducers({ authReducer, todoReducer });




const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;

