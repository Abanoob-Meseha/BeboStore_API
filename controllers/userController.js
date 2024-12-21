const { userModel } = require("../models/userModel")

const register = async (req , res , next)=>{
    try {
        let newUser = new userModel(req.body);
        const user = await newUser.save();
        res.status(201).json({
            status:'success',
            message: "User Added Successfully",
            data: {
                user: user 
            }
        })        
    } catch (error) {
        next(error)
    }
}
module.exports = {
    register
}