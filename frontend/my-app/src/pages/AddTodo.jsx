import { useState } from "react";
import { addTodo, getTasks } from "../redux/todoReducer/action";
import {  useSelector, useDispatch } from "react-redux";


const initState = {
    title:"",
    description:""
}

export const AddTodo = () => {
    const dispatch = useDispatch();
    const [todo, setTodo] = useState(initState);
    const token = useSelector((store)=> {
        console.log(store);
        return store.authReducer?.token;
    });
    console.log(token)
  

    const handleChange = (e) => {
        const {name, value} = e.target;

        setTodo(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(todo.title && todo.description){
            if(token){
                dispatch(addTodo({payload: todo, token})).then(res => {
                    dispatch(getTasks);
                })
            }
        }
    }
    return (
        <div>
            <h1>AddTodo</h1>
            <div>
                <form action=""  onSubmit={handleSubmit}>
                    <div>
                        <input type="text" placeholder="title" name="title" onChange={handleChange} value={todo.title} />
                    </div>
                    <div>
                        <input type="text" placeholder="description" name="description" value={todo.description} onChange={handleChange}/>
                    </div>
                    <div>
                        <input type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
    
}