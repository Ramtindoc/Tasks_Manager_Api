const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const TaskModel = require("../models/task-model");
// const logger = require("../logger/logger");

// create task for logging users
router.post("/task/create", auth, async (req, res) => {
  const userId = req.user.id;
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and Description are required" });
  }
  try {
    const newTask = await TaskModel.createTask(userId, title, description);
    res
      .status(201)
      .send({ message: "task created successfully", task: newTask });
  } catch (err) {
    console.error("error create task", err);
    res.status(500).send("server error");
  }
});

router.delete("/task/delete", auth, async (req, res) => {
  const userId = req.user.id;
  const { task_number } = req.body;
  if (!userId || !task_number) {
    return res.status(400).send("user is missing");
  }
  try {
    const deleteTaks = await TaskModel.deleteTask(task_number, userId); // del by id
    // affectedRows === 1 MEANS Task is found and deleted
    if (deleteTaks.affectedRows === 0) {
      return res.status(404).js("Task not found or not owned by user");
    }
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).send("server error", error);
  }
});

// show tasks from user id
router.get("/tasks", auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const getTasks = await TaskModel.getTaskBYId(userId);

    if (!userId) res.status(404).send("user is not found");
    else return res.status(200).json(getTasks);
  } catch (err) {
    res.status(500).send("server error", err);
  }
});

module.exports = router;
