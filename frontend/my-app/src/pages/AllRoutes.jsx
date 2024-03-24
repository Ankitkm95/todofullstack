import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Todos from "./Todos";
import ReqAuth from "../reqAuth/ReqAuth";
import { EditTodo } from "./EditTodo";
// import { AddTodo } from "./AddTodo";

const AllRoutes = () => {
    
    return (
        <Routes>
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/"} element={<ReqAuth><Todos /></ReqAuth>} />
            <Route path="/add" element={<ReqAuth><EditTodo /></ReqAuth>}/>
            <Route path="*" element={<h1>Page Not Found..</h1>} />
            
        </Routes>
    );
};

export default AllRoutes;