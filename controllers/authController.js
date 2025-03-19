const { User, Admin } = require("../models");
const AppError = require("../utils/AppError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req , res , next)=>{
    try {
        const {email , password} = req.body ;
        // search in users
        let user = await User.findOne({email});
        let role = "user" ;
        if(!user){
            // search in Admins
            user = await Admin.findOne({email});
            role = user ? "admin" : "user";
        }
        if(!user){
            // not user or Admin
            throw new AppError(400 , "Invalid Email or Password!!");
        }
        const hashedPassword = user.password;
        const validPassword = await bcrypt.compare(password, hashedPassword);
        if(!validPassword){
            throw new AppError(400 , "Invalid Password!!")
        }
        // create a jwt token
        const { username , firstName , lastName } = user ;
        const token = jwt.sign({username , firstName , lastName , role} , process.env.JWT_SECRET_KEY , {expiresIn:"7d"});
        res.status(200).json({
            success : true ,
            message: `Welcome ... ${username}`,
            data: {
                user ,
                token
            } 
        })
    } catch (error) {
        next(error)
    }
}

const register = async (req , res , next)=>{
    try {
        const {firstName , lastName , email , password , username} = req.body ;
        const emailExists = await User.findOne({email});
        const usernameExists = await User.findOne({username});
        if(emailExists){
            throw new AppError(400 , "Email Already Exisits!!");
        }
        if(usernameExists){
            throw new AppError(400 , "Username Already Exists!!");
        }
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;
        const hashedPassword = await bcrypt.hash(password , saltRounds)
        const newUser = new User({...req.body , password: hashedPassword});
        await newUser.save()
        res.status(200).json({
            success : true ,
            message: `${username} Account created sucessfully`,
            data: {
                user: newUser
            }
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    login ,
    register
}