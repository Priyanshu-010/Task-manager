// models/index.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import UserModel from "./user.js";
import TaskModel from "./task.js";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

export const User = UserModel(sequelize);
export const Task = TaskModel(sequelize);

User.hasMany(Task, { foreignKey: "user_id" });
Task.belongsTo(User, { foreignKey: "user_id" });
