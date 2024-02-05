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
  res.json(category);

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

  res.json({
    message: 'Category CREATED',
    data: body,
  });

});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  res.json({
    message: `Category with id: ${id} UPDATED` ,
    data: body,
  });

});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    message: `Category with id: ${id} DELETED` ,
    id,
  });

});

module.exports = router;
