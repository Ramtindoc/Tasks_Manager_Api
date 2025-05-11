const express = require("express");
const router = express.Router();
const controller = require("../controller/users-controller");
const auth = require("../middlewares/auth");

router.post("/register", controller.register);

// authentication to login with user token
// router.use(auth);

router.post("/login", controller.login);

module.exports = router;
