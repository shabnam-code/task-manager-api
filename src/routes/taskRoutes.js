const express = require("express");
const TaskService = require("../service/taskService");
const { authenticate } = require("../middlewares/authMiddleware");
const router = express.Router();

// Task routes
router.post("/", authenticate, TaskService.createTask);
router.get("/", authenticate, TaskService.getTasks);
router.put("/:id", authenticate, TaskService.updateTask);
router.delete("/:id", authenticate, TaskService.deleteTask);

module.exports = router;
