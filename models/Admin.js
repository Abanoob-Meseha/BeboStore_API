const Joi = require("joi");
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    firstName: {
        required: true,
        type: String
    },
    lastName:{
        required: true,
        type: String
    },
    username:{
        required: true,
        type: String
    },
    password:{
        required: true,
        type: String
    },
    email:{
        required: true,
        type: String,
    },
    phone_number: {
        required: true ,
        type :String
    },
    messages : [
        {
            userID : mongoose.Schema.Types.ObjectId ,
            user_img: String ,
            username: String ,
            content: String
        }
    ]
})
const joiAdmin_registerSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    username: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9$-*^$#@!]{8,30}$')).required(),
    repeat_password: Joi.ref('password'),
    adminSecretKey: Joi.string().required()
}).with('password' , 'repeat_password');

const joiAdmin_loginSchema = Joi.object({
    username: Joi.string().required(),
    password : Joi.string().required()
})

const Admin = mongoose.model("Admin" , adminSchema);

module.exports = {
    Admin ,
    joiAdmin_loginSchema,
    joiAdmin_registerSchema
}
