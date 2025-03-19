const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  addresses: [
    {
      country: String,
      governorate: String,
      city: String,
      location: String,
    },
  ],
  orders:[{
    type: mongoose.Schema.Types.ObjectId ,
    ref: 'Order'
  }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
