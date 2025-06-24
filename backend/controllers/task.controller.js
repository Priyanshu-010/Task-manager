// controllers/task.controller.js
import { Task } from "../models/index.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { user_id: req.user.id } });

    const grouped = {
      "To Do": [],
      "In Progress": [],
      "Done": [],
    };

    tasks.forEach((task) => {
      grouped[task.status].push(task);
    });

    res.status(200).json(grouped);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error });
  }
};

export const addTask = async (req, res) => {
  const { title } = req.body;
  try {
    const newTask = await Task.create({
      title,
      user_id: req.user.id,
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task", error });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { status, title } = req.body;

  try {
    const task = await Task.findOne({ where: { id, user_id: req.user.id } });
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (status) task.status = status;
    if (title) task.title = title;

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task", error });
  }
};

export const deleteTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, user_id: req.user.id } });
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.destroy();
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task", err });
  }
};

