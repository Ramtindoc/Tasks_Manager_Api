const { pool } = require("../config/db_mysql");
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const { User } = require("./users-model");
const Task = require("./task-model");
const { generateTokens } = require("../utilities/token");

const Token = sequelize.define(
  "Token",
  {
    access_token: { type: DataTypes.TEXT, allowNull: false },
    refresh_token: { type: DataTypes.TEXT, allowNull: false },
    expires_at: { type: DataTypes.DATE, allowNull: false },
  },
  {
    timestamps: true,
    tableName: "tokens",
  }
);

User.hasMany(Task, { foreignKey: "user_id" });
Task.belongsTo(User, { foreignKey: "user_id" });

class TokenModel {
  static async storeToken(accessToken, refreshToke, expiresAt) {
    try {
      await pool.query(
        `INSERT INTO demo.tokens (access_token, refresh_token, expires_at)
            VALUES (?, ?, ?)`,
        [accessToken, refreshToke, expiresAt]
      );
    } catch (err) {
      console.error("error storing tokens at :", err);
      throw err;
    }
  }
}

module.exports = { TokenModel, Token };
