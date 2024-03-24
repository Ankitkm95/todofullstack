import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {  getTasks } from "../redux/todoReducer/action";
import Card from "../components/Card";
import { AddTodo } from "./AddTodo";

//import { AddTodo } from "./AddTodo";

const Todos = () => {
    const todos = useSelector((store)=> store.todoReducer.todos);
    const dispatch = useDispatch();



    useEffect(()=>{
        dispatch(getTasks);
    },[])

    // console.log(todos);

    return (
        <div>
            <AddTodo />
            {
                todos.length && todos.map(el => <Card key={el._id} {...el} />)
            }
        </div>
    );
};

export default Todos;