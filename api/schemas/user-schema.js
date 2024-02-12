const Joi = require('joi');

// Rules for DataTypes
const id = Joi.string().min(4);
const name = Joi.string().min(3).max(20);
const email = Joi.string().email();
const role = Joi.string();

// Required or Optional
const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  role: role.required(),
});

const updateUserSchema = Joi.object({
  name: name,
  email: email,
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

const deleteUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema, deleteUserSchema };
