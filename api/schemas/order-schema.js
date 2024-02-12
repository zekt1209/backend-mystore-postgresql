const Joi = require('joi');

// Rules for DataTypes
const id = Joi.string().min(4);
const total = Joi.number().integer().min(1);

// Required or Optional
const createOrderSchema = Joi.object({
  total: total.required(),
});

const updateOrderSchema = Joi.object({
  total: total,

});

const getOrderSchema = Joi.object({
  id: id.required(),
});

const deleteOrderSchema = Joi.object({
  id: id.required(),
});

module.exports = { createOrderSchema, updateOrderSchema, getOrderSchema, deleteOrderSchema };
