const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        firstName:{
            type:String,
            required:true
        }, 
        lastName:{
            type:String,
            required: true
        }
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
    }
})

const userModel = mongoose.model('User' , userSchema);

module.exports = {
    userModel
}