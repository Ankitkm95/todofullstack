const jwt = require("jsonwebtoken");
const { UserModel } = require("../modals/user.modal");
require('dotenv').config();


const authenticate = async (req, res, next) => {
    const token1 = req.headers?.authorization;

    if(!token1 || !token1.startsWith("Bearer ")){
        return res.status(400).send({"msg":"Login First"});
    }

    const token = req.headers?.authorization?.split(" ")[1]
    if(token){
        const decoded = jwt.verify(token, process.env.SECRET);
        if(decoded){
            // console.log(decoded);
            const userID = decoded.userID;
           
            const user = await UserModel.findById(userID);
            if(!user){
                return res.send({"msg":"login failed"});
            }
           
            req.body.userID = userID;
            next();
        }
        else{
            res.send({"msg":"loing failed"});
        }  
    }
    else{
        res.send({"msg":"login failed"});
    }
}


module.exports = {authenticate}