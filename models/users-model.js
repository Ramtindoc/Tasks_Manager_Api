const {pool} = require("../config/db_mysql");

class userModel {
  static insertUser = async (name, email, password) => {
    const result = await pool.query(
      "insert into demo.users(name ,email ,password) values(?,?,?) ",
      [name, email, password]
    );
    return result;
  };

  static getEmail = async (email) => {
    const [result] = await pool.query(
      "SELECT * FROM demo.users WHERE email = ?",
      [email]
    );
    return result[0];
  };

  static getUserById = async (id) => {
    const [result] = await pool.query(
      "SELECT * FROM demo.users WHERE id = ?",
      [id]
    );
    return result[0];
  };
}
module.exports = userModel;
