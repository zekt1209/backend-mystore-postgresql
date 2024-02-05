const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();

// Logica de negocio
const CategoriesService = require('./../services/category-service');
const service = new CategoriesService();

// Endpoints de categories
router.get('/', async (req, res) => {

  const categories = await service.find();
  res.json(categories);

});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const category = await service.findOne(id);

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

router.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);

  res.status(201).json({ message: 'Category CREATED', data: newProduct });

});

router.patch('/:id', async (req, res) => {
  try {

    const { id } = req.params;
    const body = req.body;

    const changedCategory = await service.update(id, body);

    res.json({ message: `Category with id: ${id} UPDATED` , data: changedCategory });

  } catch (err) {
    res.status(404).json({ message: err.message });
  }

});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategoryId = await service.delete(id);

    res.json({ message: `Category with id: ${id} DELETED` , id: deletedCategoryId });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }

});

module.exports = router;
