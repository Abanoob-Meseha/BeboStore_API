const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    }, 
    lastName:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    }
    ,
    username:{
        type:String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    addresses:[]

})

// for validating at register
const joiRegister_userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9$-*^$#@!]{8,30}$')).required(),
    repeat_password: Joi.ref('password'),

}).with('password' , 'repeat_password')

// for validating at Login
const joiLogin_userSchema = Joi.object({
    username: Joi.string().required(),
    // password should not be less than 8 chars
    password: Joi.string().required()
})
const User = mongoose.model('User' , userSchema);

module.exports = {
    User , 
    joiLogin_userSchema,
    joiRegister_userSchema
}