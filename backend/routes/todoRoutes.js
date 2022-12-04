const express = require("express");
const {
  getTodos,
  createTodo,
  editTodo,
  deleteTodo,
  searchTodos,
} = require("../controller/todoControllers");
const userAuth = require("../middleware/userAuth");

const router = express.Router();

router.get("/getTodos", userAuth, getTodos);
router.post("/createTodo", userAuth, createTodo);
router.put("/editTodo/:todoId", userAuth, editTodo);
router.delete("/deleteTodo/:todoId", userAuth, deleteTodo);
router.get("/searchTodos", userAuth, searchTodos);

module.exports = router;
