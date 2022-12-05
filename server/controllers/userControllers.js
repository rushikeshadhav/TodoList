const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//create user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // To check all the details
    if (!(name && email && password)) {
      throw new Error("All fields are required");
    }
    const userExits = await User.findOne({ email });
    if (userExits) {
      throw new Error("Email Already Exists");
    }

    //encrypt password

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    // Inserting into the Database

    const user = await User.create({
      name,
      email,
      password: encryptedPassword,
    });

    const token = await jwt.sign(data, "shhhhh");
    const createdUser = user;
    user.password = undefined;

    res.status(200).cookie("token", token, {
      expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: false,
    });
    json({
      success: true,
      message: "User Created Successfully",
      createdUser,
      token,
    });
  } catch (error) {
    res.status(401).json({
      sucess: false,
      message: error.message,
    });
  }
};

//login user
exports.loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!(name && password)) {
      throw new Error("Both fields are required");
    }

    const user = await User.finOne({ email });

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
      throw new Error("wrong password");
    }

    const data = {
      id: user._id,
    };

    const token = await jwt.sign(data, "shhhhh");
    user.password = undefined;

    res.status(201).cookie("token", token, {
      expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: false,
    });
    json({
      sucess: true,
      user,
    });
  } catch (error) {
    res.status(401).json({
      sucess: false,
      message: error.message,
    });
  }
};

//get user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.user._id);
    if (!user) {
      throw new Error("no such user exists");
    }
    user.password = undefined;
    res.status(201).json({
      sucess: true,
      user,
    });
  } catch (error) {
    res.status(401).json({
      sucess: false,
      message: error.message,
    });
  }
};
