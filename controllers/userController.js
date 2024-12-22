const { AppError } = require("../middlewares/errorHandlingMiddleware");
const { userModel } = require("../models/userModel")
const bcrypt = require('bcrypt');

const register = async (req , res , next)=>{
    try {
        let {username , password , email , firstName , lastName} = req.body;
        // check it the user already exists
        const userExists = await userModel.findOne({$or:[{username:username.toLowerCase()} , {email:email.toLowerCase()}]});
        if (userExists){
            throw new AppError(400 , "User Already Exists!!")
        }
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);
        let hashedPassword = await bcrypt.hash(password , saltRounds)
        let newUser = new userModel({
            username :username.toLowerCase(),
            email: email.toLowerCase(),
            firstName,
            lastName,
            password:hashedPassword
        });
        const user = await newUser.save();
        res.status(201).json({
            status:'success',
            message: "User Registered Successfully",
            data: {
                user: user 
            }
        })        
    } catch (error) {
        next(error)
    }
}

const login = async (req , res , next)=>{
    try {
        const {username , password} = req.body;
        res.status(200).json({
            status:"success",
            message:""
        })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    register, 
    login
}