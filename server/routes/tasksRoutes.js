const express = require("express");
const {
  getTasks,
  addTask,
  checkTask,
  editTask,
  deleteTask,
} = require("../controllers/taskControllers");
const router = express.Router();
const userAuth = require("../middleware/userAuth");

router.get("/getTasks/:todoId", userAuth, getTasks);
router.put("/addTask/:todoId", userAuth, addTask);
router.put("/checkTask/:todoId/:taskId", userAuth, checkTask);
router.put("/editTask/:todoId/:taskId", userAuth, editTask);
router.put("/deleteTask/:todoId/:taskId", userAuth, deleteTask);

module.exports = router;
