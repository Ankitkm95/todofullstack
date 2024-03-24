const express = require("express");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const cors = require("cors");

const { connection } = require("./config/db");
const { UserModel } = require("./modals/user.modal");
const { todoController } = require("./controllers/todo.controller");

const app = express();
require('dotenv').config();


app.use(express.json())
app.use(cors({
    origin : "*"
}));

app.post("/register", async (req, res) => {
    // console.log(req.body)
    // console.log("called")
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.status(400).send({"msg":"please fill all the fields..."});
    }
   
    const userPresent = await UserModel.findOne({email})
    
    if(userPresent?.email){
       return res.status(400).send({"msg":"Try loggin in, already exist"});
    }
    else{
        try{
            bcrypt.hash(password, 4, async function(err, hash) {
                if(err){
                    return res.send({"msg":"something went wrong please try again later!!"});
                }
                const user = new UserModel({...req.body,password:hash})
                await user.save()
                res.status(201).send({"msg":"signup successfull"});
            });
           
        }
       catch(err){
            console.log(err);
            res.status(500).send({"msg": "Something went wrong, pls try again later"});
       }
    }
    
})

app.post("/login", async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        res.status(400).send({"msg":"please fill all the fields.."});;
    }
    try{
        const user = await UserModel.find({email})
         
      if(user.length > 0){
        const hashed_password = user[0].password;
        bcrypt.compare(password, hashed_password, function(err, result) {
            if(err){
                return res.status(500).send({"msg": "something went wrong please try again later.."});
            }
            if(result){
                const token = jwt.sign({"userID":user[0]._id}, process.env.SECRET);
                // delete user[0]?.password;
                // console.log(user[0]);
                res.send({"msg":"Login successfull","token" : token, "userDetails":user[0]});
            }
            else{
                res.send({"msg":"Login failed"})
            }
      })} 
      else{
        res.send({"msg":"Login failed"})
      }
    }
    catch{
        res.status(500).send({"msg": "Something went wrong, pls try again later"});
    }
})

app.use("/todo",todoController);


app.listen(process.env.PORT, async ()=>{
    try {
        await connection();
        console.log("connect with DB successfully");
    } catch (error) {
        console.log(error);
        console.log("faild to connet with DB");
    }
    console.log(`server is running on port ${process.env.PORT}`);
})