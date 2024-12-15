// using mongoDB and Mongoose
const mongoose = require('mongoose');
const Joi = require('joi');

const joiProductSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    price: Joi.number().positive().precision(2).required(),
    category: Joi.string().valid('electronics', 'clothing', 'books').required(),
    stock: Joi.boolean().required(),
    description: Joi.string().max(500).optional(),
    imgUrl: Joi.string().optional()
})

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required: true
    },
    stock:{
        type: Boolean,
        required: true
    },
    imgUrl:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    }
})

const productModel = mongoose.model('Product' , productSchema);

module.exports = {productModel , joiProductSchema};