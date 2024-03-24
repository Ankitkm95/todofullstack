const { useEffect } = require("react");
const { useSelector, useDispatch } = require("react-redux");
const { useSearchParams, useNavigate } = require("react-router-dom");
const { getTasks, updateTodo } = require("../redux/todoReducer/action");

const initState = {
    title:"",
    description:""
}

export const EditTodo = () => {
    const [todo, setTodo] = useEffect(initState)
    const {id} = useSearchParams();
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
        if(id){
            const tod = allTodo.find(el => el._id === id);
            if(tod){
                setTodo(tod);
            }
        }
    },[id,allTodo])

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
                <input type="text" name="title" value={todo.title} onChange={handleChange} />
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