const Joi = require('joi');
const { TableHints } = require('sequelize');

// Rules for DataTypes
const id = Joi.string().min(4);
const total = Joi.number().integer().min(1);
const orderId = Joi.string();
const productId = Joi.string();
const amount = Joi.string();


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

// Foreign many to many validation for 'orders-products' table
const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
});


module.exports = { createOrderSchema, updateOrderSchema, getOrderSchema, deleteOrderSchema, addItemSchema };
