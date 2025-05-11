// router
const userRouter = require("./router/users_router");
// errorHandller
const errorHandller = require("./middlewares/error_handller");
// logger module handller
const logger = require("./logger/logger");

const morgan = require("morgan");
const helmet = require("helmet");

require("dotenv").config();

// main module by express
const express = require("express");
const app = express();
app.use(express.json());

const { method } = require("lodash");

// get environment
console.log(app.get("env"));

// use morgan by tiny to get a some information
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
}

app.use(express.static("public"));

// middleware function to used structuring modules
app.use("/", userRouter);

// error handller
app.use(errorHandller);

// add connect port
const port = process.env.DB_PORT || 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
