require("dotenv").config();
const connectToDB = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const express = require("express");
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDB();
app.use("/", userRoutes);

module.exports = app;
