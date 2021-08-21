const Joi = require("joi");

const validateRegister = Joi.object({
  name: Joi.string().min(4).max(20).required().messages({
    "string.empty": `El nombre no debe quedar vacio`,
    "string.min": `El nombre debe ser minimo de 4 caracteres`,
    "string.max": `El nombre debe ser maximo de 20 caracteres`,
  }),
  email: Joi.string().min(6).max(20).required().email().messages({
    "string.empty": `El correo electronico no debe quedar vacio`,
    "string.min": `El correo electronico debe ser minimo de 6 caracteres`,
    "string.max": `El correo electronico debe ser maximo de 20 caracteres`,
  }),
  password: Joi.string().min(6).max(20).required().messages({
    "string.empty": `La constraseña no debe quedar vacia`,
    "string.min": `La constraseña debe ser minimo de 6 caracteres`,
    "string.max": `La constraseña debe ser maximo de 20 caracteres`,
  }),
  confirmPassword: Joi.string()
    .min(6)
    .max(20)
    .required()
    .valid(Joi.ref("password"))
    .messages({
      "any.only": `Las contraseñas no coinciden`,
    }),
});

const validateLogin = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

module.exports = {
  validateRegister,
  validateLogin,
};
