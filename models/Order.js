const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["placed", "shipped", "delivered", "canceled"],
    },
    contact: {
      name: String,
      phone_number: String,
      email: String,
    },
    shipping_address: {
      country: String ,
      governorate: String ,
      city: String ,
      location: String
    },
    payment: {
      type: String,
      enum: ["visa", "cash"],
    },
    shipping_fees: Number,
    deliveredAt: Date,
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
