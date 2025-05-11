const appError = require("../utilities/app_error");
const { auth } = require("../middlewares/auth");

const errorHandller = (error, req, res, next) => {
  console.log(error);
  if (error.name === "ValidationError")
    return res.status(500).send("validation is failed");

  if (error instanceof appError)
    return res
      .status(error.statusCode)
      .send({ errorCode: error.errorCode, message: error.message });

  if (auth.req.header !== "authorization")
    if (!token) return res.status(401).send("access denied");
};
module.exports = errorHandller;
