const express = require("express");
const { TodoModel } = require("../modals/todo.modal");
const { authenticate } = require("../middlewares/authentication");

const todoController = express.Router();

// getting all todos
todoController.get("/",async (req,res)=>{
    try {
        const allTodos = await TodoModel.find();
        res.status(200).send(allTodos);
    } catch (error) {
        res.status(500).send({"msg":"something went wrong please try again later.."});
    }
})

// creating a todo
todoController.post("/",authenticate,async (req,res)=>{
    try {
        const payload = req.body;
        const {title, description, userID} = payload;

        if(!title && !description && !userID){
            res.status(400).send({"msg":"please login first"});
        };
        const new_todo = new TodoModel(payload);
        await new_todo.save();
        res.status(201).send({new_todo});
    } catch (error) {
        res.status(500).send({"msg":"something went wrong please try again later.."});
    }
})

// getting single Todo
todoController.get("/:id",async (req,res)=>{
    try {
        const todoId = req.params.id;
        if(!todoId){
            return res.send({"msg":"please provide the id first"});
        }

        const singleTodo = await TodoModel.findById(todoId);
        if(!singleTodo || !singleTodo?.title){
            return res.send({"msg":"something went wrong..."})
        }
        res.status(200).send(singleTodo);
    } catch (error) {
        res.status(500).send({"msg":"something went wrong please try again later.."});
    }
});

// deleting a todo
todoController.delete("/:id",authenticate, async(req,res)=>{
    try {
        const todoId = req.params.id;
        const userId = req.body.userID;
        if(!todoId){
            return res.send({"msg":"please provide the id first"});
        };

        const todoo = await TodoModel.findOne({_id:todoId});
        if(userId !== todoo.userID.toString()){
           return res.send({"msg":"not authorised"});
        };

        const todo = await TodoModel.findByIdAndDelete(todoId);
        if(todo && todo?.title){
            res.status(201).send({"msg":"Deleted Successfully"});
        }else{
            res.status(400).send({"msg":"deletion failed"});
        }

    } catch (error) {
        res.status(500).send({"msg":"something went wrong please try again later.."});
    }
});

// update a todo
todoController.patch("/:id",authenticate,async (req,res)=>{
    try {
        const todoId = req.params.id;
        const userId = req.body.userID;
        if(!todoId){
            return res.send({"msg":"please provide the id first"});
        };

        const todoo = await TodoModel.findOne({_id:todoId});
        //console.log(userId, todoo.userID.toString());
        if(userId !== todoo.userID.toString()){
           return res.send({"msg":"not authorised"});
        };
       
        const {title, description} = req.body;
        
        if(title || description){
            const todo = await TodoModel.findByIdAndUpdate(todoId, req.body, {new: true});
            res.status(201).send(todo);
        }else{
            res.status(400).send({"msg":"please provide correct fields.."})
        }
        
        
    } catch (error) {
        console.log(error);
        res.status(500).send({"msg":"something went wrong please try again later.."});
    }
});


module.exports = {
    todoController
}