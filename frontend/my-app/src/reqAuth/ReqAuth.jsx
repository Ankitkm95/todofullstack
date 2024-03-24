import { useSelector } from "react-redux";
const { Navigate } = require("react-router-dom");


const ReqAuth = ({children}) => {
    const isAuth = useSelector(store =>{
        console.log(store);
        return  store.authReducer.isLogin;
    });

    if(!isAuth){
        return <Navigate to={"/Login"} />
    }
    return children;
};

export default ReqAuth;