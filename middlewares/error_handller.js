const appError = require("../utilities/app_error");

const errorHandller = (error, req, res, next) => {
  console.log("Error:", error);

  if (error.name === "ValidationError") {
    return res.status(400).send("Validation failed.");
  }

  if (error instanceof appError) {
    return res.status(error.statusCode).send({
      errorCode: error.errorCode,
      message: error.message,
    });
  }
  return res.status(500).send("Internal Server Error");
};

module.exports = errorHandller;