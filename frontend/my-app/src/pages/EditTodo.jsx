import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getTasks, updateTodo } from "../redux/todoReducer/action";
import { useEffect, useState } from "react";



// const { useSearchParams, useNavigate } = require("react-router-dom");
// const { getTasks, updateTodo } = require("../redux/todoReducer/action");


const initState = {
    title:"",
    description:""
}

export const EditTodo = () => {
    const [todo, setTodo] = useState(initState)
    const {id} = useParams();
    const allTodo = useSelector(store => store.todoReducer.todos);
    const token = useSelector((store)=> {
        console.log(store);
        return store.authReducer?.token;
    });
 
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(()=>{{
        if(allTodo.length === 0){
            dispatch(getTasks)
        }
    }},[])
    

    useEffect(()=>{
        if(id && allTodo.length){
            const tod = allTodo.find(el => el._id === id);
            console.log("tod",tod);
            if(tod){
                setTodo({title: tod?.title || "", description: tod?.description || ""});
            }
        }
    },[id,allTodo])

    // console.log(id)

    // console.log(todo);

    const handleChange = (e) => {
        const {name, value} = todo;

        setTodo(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefaut();

        if(todo?.title && todo?.description && token && token){
            dispatch(updateTodo({id, payload: todo, token})).then(res => {
                dispatch(getTasks).then(re => {
                    navigate("/");
                })
            })
        }
    }


    return <div>
        <form action="" onSubmit={handleSubmit}>
            <div>
                <input type="text" name="title" value={todo.title} onChange={handleChange} />
            </div>
            <div>
                <input type="text" name="title" value={todo.description} onChange={handleChange} />
            </div>
            <div>
                <input type="submit" />
            </div>
            <div>
                <button onClick={()=> navigate("/")}>Go Back</button>
            </div>
        </form>
    </div>
};