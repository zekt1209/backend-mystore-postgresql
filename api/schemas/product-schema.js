const Joi = require('joi');

// Rules for DataTypes
const id = Joi.string();
const name = Joi.string().min(3).max(20);
const price = Joi.number().integer().min(10);
const description = Joi.string();
const image = Joi.string().uri();

// Foreign Key - category_id
const categoryId = Joi.string();

// Required or Optional
const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  description: description,
  image: image,
  categoryId: categoryId,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const deleteProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, deleteProductSchema };
