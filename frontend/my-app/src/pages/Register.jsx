import axios from "axios";
import { useState } from "react";

const initState = {
    name: "",
    email: "",
    password: ""
};

const register = (payload) => {

    // console.log(process.env.REACT_APP_BASE_URL);
    
    return axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/register`,
        data: payload
    });
   
};

// console.log(process.env)
// console.log("p", process.env.REACT_APP_BASE_URL);

const Register = () => {
    const [formData, setFormData] = useState(initState);
    const [Loading, setLoading] = useState(false);
    const [err, setErr] = useState(false);
    // const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const {name, email, password} = formData;
        if(name && email && password){
            setLoading(true);
            console.log(register(formData))
            register(formData).then(res => {
                if(res?.data?.msg==="signup successfull"){
                    setLoading(false);
                    alert("Registered Successull");
                    setFormData(initState);
                }else{
                    setErr(true);
                    setLoading(false);
                }
            })
        }else{
            alert("Please fill all the fields...")
        }
    };

    const handleChange = (e) => {
        const {value, name} = e.target;
        setFormData(prev =>  ({...prev, [name]: value}))
    };

    const {name, email, password} = formData;

    if(Loading){
        return <h1>Loading...</h1>
    };
    if(err){
        return <h1>Something went wrong please refresh the page..</h1>
    }

    return (
        <div>
            <h1>REGISTER</h1>
            <div>
                <form action="" onSubmit={handleSubmit}>
                   <div>
                        <input type="text" placeholder="Name" name="name" value={name} onChange={handleChange} />
                   </div>
                   <div>
                        <input type="email" placeholder="email" name="email" value={email} onChange={handleChange} />
                   </div>
                   <div>
                        <input type="password" placeholder="Password" name="password" value={password} onChange={handleChange} />
                   </div>
                   <div>
                    <input type="submit" />
                   </div>
                </form>
            </div>
        </div>
    );
};

export default Register;