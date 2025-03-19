const Joi = require("joi");

const addProduct_schema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  price: Joi.number().positive().precision(2).required(),
  offer_percentage: Joi.number().positive().max(100),
  category: Joi.string().required(),
  stock: Joi.number().required(),
  description: Joi.string().max(500).required(),
  colors: Joi.array().items(Joi.string())
});

const updateProduct_schema = Joi.object({
  name: Joi.string().min(3).max(50),
  price: Joi.number().positive().precision(2),
  offer_percentage: Joi.number().positive().max(100),
  category: Joi.string(),
  stock: Joi.number(),
  description: Joi.string().max(500),
  colors: Joi.array().items(Joi.string())
}).min(1);

module.exports = {
  addProduct_schema,
  updateProduct_schema,
};
