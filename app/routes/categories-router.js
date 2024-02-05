const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();

// Logica de negocio
const CategoriesService = require('./../services/category-service');
const service = new CategoriesService();

// Endpoints de categories
router.get('/', (req, res) => {

  const categories = service.find();
  res.json(categories);

});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const category = service.findOne(id);

  if (!category) {
    res.status(404).json({message: `La categoria con id ${id} no existe`});
  } else {
    res.json(category);
  }


  // Preferred Structure
  //   {
  //     id,
  //     name: 'Perifericos',
  //     products: [
  //       {
  //         name: 'Product 1',
  //         price: 1000,
  //       },
  //       {
  //         name: 'Product 2',
  //         price: 800,
  //       },
  //     ]
  //   }
});

router.get('/:categoryId/products/:productId', (req, res) => {
  const {categoryId, productId} = req.params;
  res.json({
    categoryId,
    productId,
  });
});

router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = service.create(body);

  res.status(201).json({ message: 'Category CREATED', data: newProduct });

});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const changedCategory = service.update(id, body);

  res.json({ message: `Category with id: ${id} UPDATED` , data: changedCategory });

});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deletedCategoryId = service.delete(id);

  res.json({ message: `Category with id: ${id} DELETED` , id: deletedCategoryId });

});

module.exports = router;
