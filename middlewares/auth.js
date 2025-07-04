const jwt = require("jsonwebtoken");

function auth (req,res,next) {
    const authHeader  = req.headers["authorization"];
    if(!authHeader) return res.status(401).send("access token not provided");

  const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).send("Invalid or expired access token")
    }
}

module.exports = {auth};