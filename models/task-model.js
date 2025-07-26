const { pool } = require("../config/db_mysql");
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const { User } = require("./users-model");

const Task = sequelize.define(
  "Task",
  {
    task_number: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
    tableName: "tasks",
  }
);

User.hasMany(Task, { foreignKey: "user_id" });

Task.belongsTo(User, { foreignKey: "user_id" });

// manual connecte to DBMS

class TaskModel {
  // create tasks
  static async createTask(title, description, userId) {
    const [rows] = await pool.query(
      "SELECT MAX(task_number) AS max_number FROM tasks WHERE user_id = ?",
      [userId]
    );
    const maxNumber = rows[0].max_number || 0;
    const newTaskNumber = maxNumber + 1;

    const [result] = await pool.query(
      "INSERT INTO demo.tasks(task_number , title , description , user_id) VALUES(?,?,?,?)",
      [newTaskNumber, title, description, userId]
    );
    return result;
  }
  // get task By id
  static async getTaskBYId(userId) {
    const [rows] = await pool.query(
      "SELECT * FROM demo.tasks WHERE user_id = ?",
      [userId]
    );
    return rows;
  }
  // del task by id
  static async deleteTask(task_number, userId) {
    const [result] = await pool.query(
      "DELETE FROM demo.tasks WHERE task_number = ? AND user_id = ?",
      [task_number, userId]
    );
    return result;
  }
}

(module.exports = Task), TaskModel;
