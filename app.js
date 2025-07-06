const userRouter = require("./router/users_router");
const authRouter = require("./router/auth-router");
const { logger } = require("./logger/logger");
const errorHandller = require("./middlewares/error_handller");
const morgan = require("morgan");
require("dotenv").config();

// main module by express
const express = require("express");
const app = express();
app.use(express.json());

const { method } = require("lodash");

// Enable HTTP request logging in development mode for easier debugging
if (app.get("env") === "development") {
  logger("env : development");
  app.use(morgan("dev"));
} else if (app.get("env") === "production") {
  logger("env : production");
  app.use(morgan("combined"));
}

app.use(express.static(__dirname));

app.use("/api", userRouter);
app.use("/api", authRouter);

// error handller
app.use(errorHandller);

// Use the port from environment variables or default to 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger(`app running on port ${port}`);
});
