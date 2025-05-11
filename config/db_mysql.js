const mysql = require("mysql2");
const logger = require("../logger/logger");
require("dotenv").config();

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  .promise();

const getTable = async (req, res) => {
  const getpool = await pool.query("select * from test.users");
  // return getpool[0];
};

const res1 = getTable().then((res) => {
  // logger.test(res);
});

module.exports = pool;
