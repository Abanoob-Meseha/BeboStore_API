const express = require('express');
const authRouter = express.Router();
const userController = require("../controllers/userController");
const validate = require('../middlewares/validatorMiddleware');
const { joiRegister_userSchema, joiLogin_userSchema } = require('../models/userModel');
const { limiter } = require('../middlewares/rateLimitMiddleware');

authRouter.post('/login' , limiter ,validate(joiLogin_userSchema) ,userController.login)

authRouter.post('/register' , validate(joiRegister_userSchema) , userController.register)

module.exports = authRouter;