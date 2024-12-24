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
    }
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

const adminModel = mongoose.model("Admin" , adminSchema);

module.exports = {
    adminModel ,
    joiAdmin_loginSchema,
    joiAdmin_registerSchema
}
