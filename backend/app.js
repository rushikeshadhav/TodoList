const express = require("express");
const connectToDB = require("./config/db");
const cookieParser = require("cookie-parser");
const todoRoutes = require("./routes/todoRoutes");
const taskRoutes = require("./routes/tasksRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const app = express();

app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectToDB();

app.use("/api", todoRoutes);
app.use("/api", taskRoutes);
app.use("/api/v1", userRoutes);

module.exports = app;
