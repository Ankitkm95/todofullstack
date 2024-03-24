import { useDispatch, useSelector } from "react-redux";
import { deleteTask, getTasks } from "../redux/todoReducer/action";
import { useNavigate } from "react-router-dom";


const Card = ({title, description, _id, userID}) => {
    const dispatch = useDispatch();
    const token = useSelector((store)=> {
        console.log(store);
        return store.authReducer?.token;
    });
    const userId = useSelector(store => {
        return store.authReducer.userDetail["_id"];
    });
    const navigate = useNavigate();

    const DeleteTodo = () => {
        if(_id && token){
            dispatch(deleteTask({id:_id, token})).then(res => dispatch(getTasks))
        }
    };


    return (
        <div style={{border:"1px solid black", padding:"10px", margin:"10px"}}>
            <div>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            <div>
                <button disabled={userId !== userID} onClick={()=> navigate(`edit/${_id}`)}>EDIT</button>
                <button disabled={userId !== userID} onClick={DeleteTodo}>DELETE</button>
            </div>
        </div>
    );
};

export default Card;