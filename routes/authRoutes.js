const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");
const validate = require("../middlewares/validator");
const limiter = require("../middlewares/rateLimit");
const authValidation = require("../validation/auth");

authRouter.post(
  "/login",
  limiter,
  validate(authValidation.login_Schema),
  authController.login
);

authRouter.post(
  "/register",
  limiter,
  validate(authValidation.register_schema),
  authController.register
);

module.exports = authRouter;
