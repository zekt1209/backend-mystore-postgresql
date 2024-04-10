const Joi = require('joi');

// Rules for DataTypes
const id = Joi.string().min(4);
const name = Joi.string().min(3).max(20);
const email = Joi.string().email();
const password = Joi.string();
const role = Joi.string();

// Required or Optional
const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  // De momento se queda comentado al implementar logica de ORM
  role: role.required(),
});

const updateUserSchema = Joi.object({
  name: name,
  email: email,
  password: password,
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

const deleteUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema, deleteUserSchema };
