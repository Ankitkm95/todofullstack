const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }
});

const TodoModel = mongoose.model("todo", todoSchema);

module.exports = {TodoModel};