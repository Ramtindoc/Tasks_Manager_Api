const mysql = require("mysql2");
// const logger = require("../logger/logger");
require("dotenv").config();

const pool =  mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  .promise();

  // ذخیره توکن
async function storeToken(userId,accessToken,refreshToken,expiresAt) {
 
  try {

    await pool.execute(
  'INSERT INTO demo.user_tokens (user_id, access_token, refresh_token, created_at, expires_at) VALUES (?, ?, ?, ? ,?)',
  [userId, accessToken, refreshToken, new Date(),expiresAt]
);
 } catch (err) {
    console.error('error storing tokens',err);
    throw err
 }
 }

// خواندن توکن 
async function getTokenByRefreshToken(refreshToken) {
  // const [rows,fields]
  try {
    const[rows] = await pool.execute (
  'SELECT * FROM demo.user_tokens WHERE refresh_token = ?',
  [refreshToken]
);
return rows[0];

  } catch (err) {
    console.error('Error fetching token',err);
    throw err;
  }
} 


module.exports ={pool,storeToken,getTokenByRefreshToken};
