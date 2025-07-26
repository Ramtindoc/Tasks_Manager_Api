const jwt = require("jsonwebtoken");
const { storeToken, getTokenByRefreshToken } = require("../config/db_mysql");
const { generateTokens } = require("../utilities/token");

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).send("refresh token is required");

  try {
    const stored = await getTokenByRefreshToken(refreshToken);
    if (!stored) return res.status(403).send("invalid refresh token");

    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const {
      accessToken,
      refreshToken: newRefreshToken,
      expiresAt,
    } = generateTokens(payload.id);

    await storeToken(payload.id, accessToken, newRefreshToken, expiresAt);

    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (err) {
    res.status(403).send("invalid or expired refresh token");
  }
};

module.exports = { refreshToken };
