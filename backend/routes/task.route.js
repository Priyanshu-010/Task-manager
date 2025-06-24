// routes/task.routes.js
import express from "express";
import { getTasks, addTask, updateTask, deleteTaskById } from "../controllers/task.controller.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", addTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTaskById);

export default router;
