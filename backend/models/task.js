// models/task.model.js
import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define("Task", {
    title: { type: DataTypes.STRING, allowNull: false },
    status: {
      type: DataTypes.ENUM("To Do", "In Progress", "Done"),
      defaultValue: "To Do",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
