const Todo = require("../models/Todo");

// get todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.user._id });
    res.status(200).json({
      success: true,
      message: "successfuly retriewed",
      todos,
    });
  } catch (error) {
    res.status(401).json({
      sucess: false,
      message: error.message,
    });
  }
};

// create todos

exports.createTodo = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error("user not found");
    }

    const { title, color } = req.body;
    if (!title) {
      throw new Error("title cannot be empty");
    }

    const todo = await Todo.create({
      title,
      color,
      user: user._id,
    });
    res.status(200).json({
      success: true,
      message: "successfully created todo",
      todo,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// edit todo title

exports.editTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const { title, color } = req.body;

    const checkTodo = await todoId.findById({ todoId });
    if (!checkTodo) {
      throw new Error("no such todo exists");
    }

    const todo = await Todo.findById({ todoId });
    todo.title = title;
    todo.color = color;

    const editTodo = await Todo.findByIdAndUpdate(todoId, todo);
    res.status(200).json({
      success: true,
      message: "successfully edited todo",
      editTodo,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

// delete todo

exports.deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const checkToExists = await Todo.findById(todoId);
    if (!checkToExists) throw new Error("no such todo exists");

    const deletedTodo = await Todo.findByIdAndDelete(todoId);
    res.status(200).json({
      success: true,
      message: "successfully deleted todo",
      deletedTodo: deletedTodo,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

// search
exports.searchTodos = async (req, res) => {
  try {
    let { search } = req.query;

    const todos = await Todo.find({
      $or: [
        {
          $and: [
            { title: new RegExp(search, "i") },
            { user: req.user.user_id },
          ],
        },
        {
          $and: [
            { "tasks.main": new RegExp(search, "i") },
            { user: req.user.user_id },
          ],
        },
      ],
    });
    res.json({
      success: true,
      message: "retrived query",
      todos,
    });
  } catch (err) {
    // console.log(err)
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};
