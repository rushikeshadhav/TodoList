// URL PATH
const express = require("express");
const {
  home,
  createUser,
  getUsers,
  editUser,
} = require("../controllers/userControllers");
const router = express.Router();

router.post("/u/createUser", createUser);
router.post("/u/loginUser", getUsers);
router.get("/u/getUser", editUser);

module.exports = router;
