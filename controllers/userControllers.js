const User = require("../models/userModel");

exports.home = (req, res) => {
  res.send("Hello world");
};

exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!(name && email)) {
      throw new Error("Both fields are required");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("Email already exists");
    }
    const newUser = await User.create({ name, email });
    res.status(201).json({
      success: true,
      message: "User created sucessfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      sucess: false,
      message: error.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      sucess: true,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      sucess: false,
      message: error.message,
    });
  }
};

exports.editUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      sucess: true,
      message: "User updated sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      sucess: false,
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      sucess: true,
      message: "User deletted sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      sucess: false,
      message: error.message,
    });
  }
};
