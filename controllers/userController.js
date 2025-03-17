const { AppError } = require("../middlewares/errorHandling");
const {User} = require("../models")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);

const register = async (req , res , next)=>{
    try {
        let {username , password , email , firstName , lastName} = req.body;
        // check it the user already exists
        const userExists = await User.findOne({$or:[{username:username.toLowerCase()} , {email:email.toLowerCase()}]});
        if (userExists){
            throw new AppError(400 , "User Already Exists!!")
        }
        let hashedPassword = await bcrypt.hash(password , saltRounds)
        let newUser = new User({
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
        const user = await User.findOne({username:username.toLowerCase()});
        // check if the user have Account
        if(!user){
            throw new AppError(404 , `${username} doesn't Exist`)
        }
        // check if the password is valid
        const validPassword = await bcrypt.compare(password , user.password);
        if(!validPassword){
            throw new AppError(403 , "Invalid Password!!")
        }
        // generate token to send to the client side
        const payload = {id:user._id, username:user.username, role:"client"}
        const token = jwt.sign(payload , process.env.JWT_SECRET_KEY)
        res.status(200).cookie('token' , token ,{
            httpOnly: true,  // Prevent access via JavaScript
            secure: true,    // Only send over HTTPS
            sameSite: 'Strict',  // Prevent cross-site requests
            maxAge: 3600000  // 1 hour expiration time
        }).json({
            status:"success",
            message:`Login Successfully, Welcome ${user.firstName}`,
            data:{
                user,
                token
            }
        })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    register, 
    login
}