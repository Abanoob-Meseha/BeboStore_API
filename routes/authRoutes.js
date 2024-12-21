const express = require('express');
const authRouter = express.Router();
const userController = require("../controllers/userController")
authRouter.post('/login' , (req , res)=>{

})

authRouter.post('/register' , userController.register)

module.exports = authRouter;