const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const { pool } = require("../config/db_mysql");

const User = sequelize.define(
  "User",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true, tableName: "users" }
);

class UserModel {
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
    const [result] = await pool.query("SELECT * FROM demo.users WHERE id = ?", [
      id,
    ]);
    return result[0];
  };
}
module.exports = { User, UserModel };
