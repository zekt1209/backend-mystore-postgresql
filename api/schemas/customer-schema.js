const Joi = require('joi');

// Rules for DataTypes
const id = Joi.string().min(4);
const name = Joi.string().min(3).max(20);
const lastName = Joi.string().min(3).max(20);
const phone = Joi.string();

// Required or Optional

const createCustomerSchema = Joi.object({

  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),

});

const updateCustomerSchema = Joi.object({

  name: name,
  lastName: lastName,
  phone: phone,

});

const getCustomerSchema = Joi.object({

  id: id.required()

});

const deleteCustomerSchema = Joi.object({

  id: id.required()

});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema, deleteCustomerSchema };
