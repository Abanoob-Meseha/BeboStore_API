const Joi = require("joi");

// for validating at register
const register_schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$"))
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long, contain at least one uppercase letter, one number, and include letters.",
      "any.required": "Password is required.",
    }),

  confirm_password: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Confirm password and password must be identical.",
      "any.required": "Confirm password is required.",
    }),
}).with("password", "confirm_password");

// for validating at Login
const login_Schema = Joi.object({
  email: Joi.string().required(),
  // password should not be less than 8 chars
  password: Joi.string().required(),
});

module.exports = {
  login_Schema,
  register_schema,
};
