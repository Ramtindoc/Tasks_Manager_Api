const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { id: userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" } // 15 دقیقه اعتبار
  );

  const refreshToken = jwt.sign(
    { id: userId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" } // 7 روز اعتبار
  );
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 روز بعد

  return { accessToken, refreshToken, expiresAt };
};

module.exports = { generateTokens };
