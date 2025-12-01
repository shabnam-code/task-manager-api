const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
mongoose
  .connect("mongodb://127.0.0.1:27017/taskDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

// Start server
const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
