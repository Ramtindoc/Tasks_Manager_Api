const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  .promise();

// Store token
async function storeToken(accessToken, refreshToken, expiresAt) {
  try {
    await pool.execute(
      "INSERT INTO demo.tokens (access_token, refresh_token, expires_at) VALUES (?, ?, ?)",
      [accessToken, refreshToken, expiresAt]
    );
  } catch (err) {
    console.error("error storing tokens", err);
    throw err;
  }
}

// Read token
async function getTokenByRefreshToken(refreshToken) {
  // const [rows,fields]
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM demo.tokens WHERE refresh_token = ?",
      [refreshToken]
    );

    return rows[0];
  } catch (err) {
    console.error("Error fetching token", err);
    throw err;
  }
}

module.exports = { pool, storeToken, getTokenByRefreshToken };
