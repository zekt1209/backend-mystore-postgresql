const Joi = require('joi');

// Rules for DataTypes
const id = Joi.string().min(4);
const name = Joi.string().min(3).max(20);

// Required or Optional
const createCatrgorySchema = Joi.object({
  name: name.required(),
});

const updateCategorySchema = Joi.object({
  name: name,
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

const deleteCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = { createCatrgorySchema, updateCategorySchema, getCategorySchema, deleteCategorySchema };
