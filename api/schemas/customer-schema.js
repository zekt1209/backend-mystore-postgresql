const Joi = require('joi');

// Rules for DataTypes
const id = Joi.string().min(4);
const name = Joi.string().min(3).max(20);
const lastName = Joi.string().min(3).max(20);
const phone = Joi.string();

// Reference - User info
const userId = Joi.string();
const userName = Joi.string();
const email = Joi.string();
const password = Joi.string();

// Required or Optional

const createCustomerSchema = Joi.object({

  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  userId: userId.required(),
  // Not implemented yet
  // user: Joi.object({
  //   name: userName.required(),
  //   email: email.required(),
  //   password: password.required()
  // }),

});

const updateCustomerSchema = Joi.object({

  name: name,
  lastName: lastName,
  phone: phone,
  userId: userId,

});

const getCustomerSchema = Joi.object({

  id: id.required()

});

const deleteCustomerSchema = Joi.object({

  id: id.required()

});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema, deleteCustomerSchema };
