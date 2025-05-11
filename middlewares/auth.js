const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
  const token = req.header("authorization");

  if (!token) return res.status(401).send("access denied");
  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.userData = decode;
    next();
  } catch (error) {
    return res.status(400).send("token is invalid");
  }
}

module.exports = auth;
