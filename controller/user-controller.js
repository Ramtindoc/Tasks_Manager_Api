const userModel = require("../models/users-model");
const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { tryCatchHandller } = require("../utilities/trycatch_handller");
const appError = require("../utilities/app_error");
const logger = require("../logger/logger");
const rateLimit = require('express-rate-limit');
const TokenModel = require("../models/token-model")
const {generateTokens} = require("../utilities/token")
require("dotenv").config();

// rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'تعداد درخواست‌های شما بیش از حد مجاز است. لطفاً بعداً دوباره تلاش کنید.',
  standardHeaders: true, 
  legacyHeaders: false, 
});

//  rergister
const register = tryCatchHandller(async (req, res) => {
  const schema = {
    
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().min(5).max(100).required(),
    password: Joi.string().min(5).max(100).required(),
    
  };
  // validate
  const validateResult = Joi.object(schema).validate(req.body);

  if (validateResult.error) throw validateResult.error;

  // controll repeat to send data by email
  const user = await userModel.getEmail(req.body.email);
  if (user) {
    // return res.status(400).send("user is already register!");
    throw new appError(100, "user is already register", 400);
  }
  const hashPass = await bcrypt.hash(req.body.password, 10);
  // insert at body requests and writen in model module
  const result = await userModel.insertUser(
    req.body.name,
    req.body.email,
    hashPass
    // req.body.password    //test
  );
  logger.register(result);

  // new user
  const newUser = await userModel.getEmail(req.body.email);

  // return create a new user and is show just name and email and send in frontend just this
  // user 'lodash' to get details like name and email
  const token = jwt.sign({ id: newUser.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  return res
    .header("authorization", token)
    .send(_.pick(newUser, "name", "email"))});

// ----- login

const login = tryCatchHandller(async (req, res) => {
  const schema = {
    email: Joi.string().email().min(5).max(100).required(),
    password: Joi.string().min(5).max(100).required(),
  };
  // validate
  const validateResult = Joi.object(schema).validate(req.body);

  if (validateResult.error)
    return res.send(validateResult.error.details[0].message);

  const user = await userModel.getEmail(req.body.email);
  if (!user) {
    return res.status(404).send("email or password is invalid");
  }

  const validUser = await bcrypt.compare(req.body.password, user.password);
  if (!validUser) return res.status(400).send("email or password is invalid");

  const { accessToken, refreshToken, expiresAt } = generateTokens(user.id);

  await TokenModel.storeToken(user.id, accessToken, refreshToken, expiresAt);

  return res.header("authorization", accessToken).send(_.pick(user, "email"));
});

module.exports = { limiter, register, login };
