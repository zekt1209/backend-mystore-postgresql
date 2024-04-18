const Joi = require('joi');

// Rules for DataTypes
const id = Joi.string().min(4);
const total = Joi.number().integer().min(1);

// ForeignKey: customerId
const customerId = Joi.string().min(4);

// Required or Optional
const createOrderSchema = Joi.object({
  total: total.required(),
  customerId: customerId.required(),
});

const updateOrderSchema = Joi.object({
  total: total,
  customerId: customerId
});

const getOrderSchema = Joi.object({
  id: id.required(),
});

const deleteOrderSchema = Joi.object({
  id: id.required(),
});

module.exports = { createOrderSchema, updateOrderSchema, getOrderSchema, deleteOrderSchema };
