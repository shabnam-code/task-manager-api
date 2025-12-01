const Task = require("../../Model/task");

// Controller to create a task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const userId = req.user.id;
    if (!title || !description) {
      return res.status(400).send("Title and Description are required");
    }
    const newTask = new Task({
      title,
      description,
      status,
      createdBy: userId,
    });
    await newTask.save();
    res.status(201).json({ message: "Task created successfully", newTask });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).send("Server error");
  }
};

// Controller to get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).send("Server error");
  }
};

// Controller to update a task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).send("Task not found");
    }
    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).send("Server error");
  }
};

// Controller to delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await Task.findByIdAndDelete(id);
    if (!deleteTask) {
      return res.status(404).send("Task not found");
    }
    res.status(200).json({ message: "Task deleted successfully", deleteTask });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).send("Server error");
  }
};
