import { Link } from "react-router-dom";
import styles from "./Navbar.module.css"
import { useDispatch, useSelector } from "react-redux";


const Navbar = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(store =>{
        console.log(store);
        return  store.authReducer.isLogin;
    })

    return (
        <div className={styles.navbar}>
            <div>
                <Link className={styles.navLink} to={"/"}>Todos</Link>
            </div>        
            <div>
                {!isAuth && <Link className={styles.navLink} to={"/register"}>Register</Link>}
                {!isAuth ? <Link className={styles.navLink} to={"/login"}>Login</Link> : <button onClick={()=> dispatch({type:"Init_Action"})}>Logout</button>}
            </div>
        </div>
    );
};

export default Navbar;