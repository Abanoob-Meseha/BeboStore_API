// using mongoDB and Mongoose
const mongoose = require("mongoose");

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
      default: 0
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
        userID: {type: mongoose.Schema.Types.ObjectId , ref: 'Comment'},
        username: String,
        user_img: String,
        content: String,
        rating: Number,
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
