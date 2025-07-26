const userRouter = require("./router/users_router");
const authRouter = require("./router/auth-router");
const taskRouter = require("./router/task_router");

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
  logger("in development");
  app.use(morgan("dev"));
} else if (app.get("env") === "production") {
  logger("in production");
  app.use(morgan("combined"));
}

app.use(express.static(__dirname));

app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", taskRouter);

// error handller
app.use(errorHandller);

// Use the port from environment variables or default to 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger(`app running on port ${port}`);
});
