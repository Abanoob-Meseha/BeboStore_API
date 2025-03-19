const Joi = require("joi");

const addProduct_schema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  price: Joi.number().positive().precision(2).required(),
  category: Joi.string().valid("electronics", "clothing", "books").required(),
  stock: Joi.boolean().required(),
  description: Joi.string().max(500).optional(),
  imgUrl: Joi.string().optional(),
});

const updateProduct_schema = Joi.object({
  name: Joi.string().min(3).max(50),
  price: Joi.number().positive().precision(2),
  category: Joi.string().valid("electronics", "clothing", "books"),
  stock: Joi.boolean(),
  description: Joi.string().max(500),
  imgUrl: Joi.string().optional(),
}).min(1);

module.exports = {
  addProduct_schema,
  updateProduct_schema,
};
