import mongoose from "mongoose";

const { Schema } = mongoose;

const todoSchema = new Schema({
  title: String,
  tasks: [String],
});

const todoModel = mongoose.model("todo", todoSchema);

export default todoModel;
