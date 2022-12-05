// URL PATH
const express = require("express");
const {
  createUser,
  loginUser,
  getUser,
} = require("../controllers/userControllers");
const userAuth = require("../middleware/userAuth");
const router = express.Router();

router.post("/u/createUser", createUser);
router.post("/u/login", loginUser);
router.get("/u/getUser", userAuth, getUser);

module.exports = router;
