// using mongoDB and Mongoose
const mongoose = require("mongoose");
const Joi = require("joi");

const joiProductSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  price: Joi.number().positive().precision(2).required(),
  category: Joi.string().valid("electronics", "clothing", "books").required(),
  stock: Joi.boolean().required(),
  description: Joi.string().max(500).optional(),
  imgUrl: Joi.string().optional(),
});
const joiUpdateProductSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  price: Joi.number().positive().precision(2),
  category: Joi.string().valid("electronics", "clothing", "books"),
  stock: Joi.boolean(),
  description: Joi.string().max(500),
  imgUrl: Joi.string().optional(),
}).min(1);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    offer_percentage: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    imgs: [
      {
        type: String,
        required: true,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },
    colors: [
      {
        type: String,
      },
    ],
    comments: [
      {
        userID: mongoose.Schema.Types.ObjectId ,
        username: String ,
        user_img:String ,
        content: String ,
        rating : Number
      },
    ],
  }, {timestamps: true}
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product, joiProductSchema, joiUpdateProductSchema };
