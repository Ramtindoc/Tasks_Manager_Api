const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const TaskModel = require("../models/task-model");
const logger = require("../logger/logger");

// create task for logging users
router.post("/tasks", auth, async (req, res) => {
  const userId = req.user.id;
  const { title, description } = req.body;

  if (!title) return res.status(400).send("title is required");

  try {
    const result = await TaskModel.createTask(userId, title, description);
    res.status(201).send({ message: "task created", userId: userId });
  } catch (err) {
    console.error("error create task", err);
    res.status(500).send("server error");
  }
});

// show tasks of user id
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
