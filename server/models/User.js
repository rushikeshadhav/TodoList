const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "name is compulsory"],
  },
  email: {
    type: String,
    require: [true, "email is compulsory"],
  },
  password: {
    type: String,
    minLength: [8, "password must be less than 8 characters"],
    require: [true, "password is required"],
  },
});

module.exports = new mongoose.model("User", userSchema);
