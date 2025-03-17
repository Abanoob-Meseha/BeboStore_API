const {Admin} = require("../models")
const {AppError} = require("../middlewares/errorHandling");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);
const adminSecret = String(process.env.ADMIN_SECRET_KEY);

const adminLogin = async (req , res , next)=>{
    try {
        // check if Admin Account Found
        const {username , password} = req.body;
        const user = await Admin.findOne({username});
        if(!user){
            throw new AppError(404 , "user wasn't found!!")
        }
        // check the password
        const validPassword = await bcrypt.compare(password , user.password )
        if(!validPassword){
            throw new AppError(400 , "invalid password !!")
        }
        // create a token 
        const token = jwt.sign({id:user._id , username:user.username} , process.env.JWT_SECRET_KEY);
        // send a response
        res.cookie('token' , token ,{
            httpOnly: true,  // Prevent access via JavaScript
            secure: true,    // Only send over HTTPS
            sameSite: 'Strict',  // Prevent cross-site requests
            maxAge: 3600000  // 1 hour expiration time
        }).status(200).json({
            status:"success",
            message: "Logged in Successfully.. Welcome Admin",
            data:{
                user,
                token
            }
        })
    } catch (error) {
        next(error)
    }
}

const adminRegister = async (req , res , next)=>{
    // ---> 2 way to make it safe
    // 1- to put a secret key and checks it
    // 2- to protect the route to not be accessed if it is not Admin
    // we will implement the first way here
    try {
        const {firstName , lastName , email ,username , password , adminSecretKey} = req.body;
        if(adminSecretKey != adminSecret){
            throw new AppError(403 , "Wrong Key .. Not Authorized!!")
        }
        const adminExists = await Admin.findOne({$or:[{email:email.toLowerCase()} , {username: username.toLowerCase()}]}) 
        if(adminExists){
            throw new AppError(400 , "Admin already Exists!!")
        }
        // hash Admin password
        const hashedPassword = await bcrypt.hash(password , saltRounds);
        // create and Save the new Admin
        const newAdmin = new Admin({
            firstName,
            lastName,
            username,
            email,
            password:hashedPassword
        })
        const Admin = await newAdmin.save();
        res.status(201).json({
            status:"success",
            message: "Admin Added Successfully",
            data:{
                user :Admin
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    adminLogin,
    adminRegister
}