const Todo = require("../models/Todo");

// get all task from specific todo
exports.getTasks = async (req, res) => {
  try {
    const { todoId } = req.params;
    const checkTodoExists = await Todo.findById(todoId);
    if (!checkTodoExists) throw new Error("no such todo exists");

    const todo = await Todo.findById(todoId);
    const tasks = todo.tasks;
    res.status(200).json({
      success: true,
      message: "tasks successfully retrieved",
      tasks,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

// create tasks
exports.addTask = async (req, res) => {
  try {
    const { todoId } = req.params;
    const checkTodoExists = await Todo.findById(todoId);
    if (!checkTodoExists) throw new Error("no such todo exists");

    const todo = await Todo.findById(todoId);

    // inserting task
    todo.tasks.push({ main: req.body.main, taskCreatedAt: new Date() });
    const savedTask = await Todo.findByIdAndUpdate(todoId, todo);
    res.status(200).json({
      success: true,
      message: "tasks successfully added",
      todo,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

// check and uncheck task for showing complete or not
exports.checkTask = async (req, res) => {
  try {
    const { todoId, taskId } = req.params;
    const checkTodoExists = await Todo.findById(todoId);
    if (!checkTodoExists) throw new Error("no such todo exists");

    const todo = await Todo.findById(todoId);
    const checkTaskExist = todo.tasks.filter((e) => e._id == taskId);
    // console.log(checkTaskExist)

    if (checkTaskExist.length == 0) throw new Error("no such task exists");

    // creating new task with checked or unchecked targeted task
    const updatedTasks = todo.tasks.map((e) => {
      if (e._id == taskId) {
        if (e.checked) {
          e.checked = false;
        } else {
          e.checked = true;
        }
        return e;
      } else return e;
    });

    // then updating todo with new tasks
    todo.tasks = updatedTasks;
    const updatedTodo = await Todo.findByIdAndUpdate(todoId, todo);

    res.status(200).json({
      success: true,
      message: "tasks successfully checked/unchecked",
      todo,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

// editing task
exports.editTask = async (req, res) => {
  try {
    const { todoId, taskId } = req.params;
    console.log(req.user);
    const checkTodoExists = await Todo.findById(todoId);
    if (!checkTodoExists) throw new Error("no such todo exists");

    const todo = await Todo.findById(todoId);
    const checkTaskExist = todo.tasks.filter((e) => e._id == taskId);
    // console.log(checkTaskExist)

    if (checkTaskExist.length == 0) throw new Error("no such task exists");

    // creating new task with new targeted task
    const updatedTasks = todo.tasks.map((e) => {
      if (e._id == taskId) {
        e.main = req.body.main;
        e.taskupdatedAt = new Date();
        return e;
      } else return e;
    });

    // then updating todo with new tasks
    todo.tasks = updatedTasks;
    const updatedTodo = await Todo.findByIdAndUpdate(todoId, todo);

    res.status(200).json({
      success: true,
      message: "tasks successfully checked/unchecked",
      todo,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { todoId, taskId } = req.params;
    const checkTodoExists = await Todo.findById(todoId);
    if (!checkTodoExists) throw new Error("no such todo exists");

    const todo = await Todo.findById(todoId);
    const checkTaskExist = todo.tasks.filter((e) => e._id == taskId);
    // console.log(checkTaskExist)

    if (checkTaskExist.length == 0) throw new Error("no such task exists");

    // creating new task with deleting targeted task
    const updatedTasks = todo.tasks.filter((e) => e._id != taskId);

    // then updating todo with new tasks
    todo.tasks = updatedTasks;
    const updatedTodo = await Todo.findByIdAndUpdate(todoId, todo);

    res.status(200).json({
      success: true,
      message: "tasks successfully deleted",
      todo,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};
