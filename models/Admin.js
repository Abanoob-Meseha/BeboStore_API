const Joi = require("joi");
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  phone_number: {
    required: true,
    type: String,
  },
  categories: [String],

});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
