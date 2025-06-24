// app.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import taskRoutes from "./routes/task.route.js";
import { sequelize } from "./models/index.js";
import { authenticateToken } from "./middlewares/auth.middleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/tasks", authenticateToken, taskRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
