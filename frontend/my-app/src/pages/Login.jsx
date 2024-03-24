import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authReducer/action";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";

const initState = {
    email: "",
    password: ""
};

const Login = () => {
    const [userCredientials, setUserCredientials] = useState(initState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuth = useSelector(store =>{
        console.log(store);
        return  store.authReducer.isLogin;
    })
    const isLoading = useSelector(store => store.authReducer.isLoading);
    const isError= useSelector(store => store.authReducer.isError);
  
    
    /*
    isLogin: false,
    isLoading: false,
    isError: false,
    useDetail:{},
    token:""
    */


    const handleChange = (e) => {
        const {name, value} = e.target;

        setUserCredientials(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const {email, password} = userCredientials;
        if(email && password){
            dispatch(login(userCredientials)).then(res=>{
                // console.log(res)
                if(res?.type === "USER_LOGIN_SUCCESS"){
                    console.log(res?.data)
                    setUserCredientials(initState);
                    alert("Login Successfull..")
                    navigate("/");
                }else{
                    dispatch({type: "Init_Action"});
                    alert("Login Failed");
                }
            })
        }else{
            alert("Please fill all the fields before login..")
        }

    };
    

    if(isAuth){
        return <Navigate to={"/"} />
    }

    const {email, password} = userCredientials;

    
    if(isLoading){
        return <Loading />
    };

    if(isError){
        return <Error />
    };

    return (
        <div>
           <h1>LOGIN</h1>
           <div>
                <form action="" onSubmit={handleSubmit}>
                   <div>
                        <input type="email" placeholder="email" name="email" value={email} onChange={handleChange} />
                   </div>
                   <div>
                        <input type="password" placeholder="Password" name="password" value={password} onChange={handleChange} />
                   </div>
                   <div>
                    <input type="submit" value={isLoading ? "..." : "submit"} />
                   </div>
                </form>
            </div>
        </div>
    );
};

export default Login;