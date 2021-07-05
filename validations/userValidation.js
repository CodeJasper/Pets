const Joi = require("@hapi/joi");

const validateRegister = Joi.object({
  name: Joi.string().min(6).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
  confirmPassword: Joi.string().min(6).max(1024).required(),
});

const validateLogin = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

module.exports = {
  validateRegister,
  validateLogin,
};
