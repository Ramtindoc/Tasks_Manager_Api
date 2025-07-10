const { pool } = require("../config/db_mysql");

// create task model

class TaskModel {
  // create tasks
  static async createTask(userId, title, description) {
    const [result] = await pool.query(
      "INSERT INTO demo.tasks(user_id , title , description) VALUES(?,?,?)",
      [userId, title, description]
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
}

module.exports = TaskModel;
