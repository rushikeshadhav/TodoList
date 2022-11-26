const mongoose = require("mongoose");
const { Schema } = mongoose;

const userModel = new Schema({
  name: {
    type: String,
    require: [true, "Name is required"],
    trim: true,
    maxLength: [25, "Name must be 25 ch long"],
  },
  email: {
    type: String,
    require: [true, "Email is required"],
    unique: true,
  },
});

module.exports = mongoose.model("User", userModel);
