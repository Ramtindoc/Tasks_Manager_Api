const pool = require("../config/db_mysql");

class userModel {
  static insertUser = async (name, email, password) => {
    const result = pool.query(
      "insert into test.users(name ,email ,password) values(?,?,?) ",
      [name, email, password]
    );
    return result;
  };

  static getEmail = async (email) => {
    const [result] = await pool.query(
      "SELECT * FROM test.users WHERE email = ?",
      [email]
    );
    return result[0];
  };
}
module.exports = userModel;
