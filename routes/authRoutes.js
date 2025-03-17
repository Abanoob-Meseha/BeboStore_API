const express = require('express');
const authRouter = express.Router();
const userController = require("../controllers/userController");
const adminController = require("../controllers/adminController")
const validate = require('../middlewares/validator');
const { joiRegister_userSchema, joiLogin_userSchema } = require('../models/User');
const  limiter  = require('../middlewares/rateLimit');
const { joiAdmin_loginSchema, joiAdmin_registerSchema } = require('../models/Admin');

authRouter.post('/login' , limiter ,validate(joiLogin_userSchema) ,userController.login)

authRouter.post('/register' , validate(joiRegister_userSchema) , userController.register)

authRouter.post('/adminLogin' , limiter ,validate(joiAdmin_loginSchema) ,adminController.adminLogin)

authRouter.post('/adminRegister' , validate(joiAdmin_registerSchema) , adminController.adminRegister)

module.exports = authRouter;