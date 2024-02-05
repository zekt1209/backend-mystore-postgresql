const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();

const ProductsService = require('./../services/product-service');
const service = new ProductsService();

// Products
router.get('/', (req, res) => {

  const products = service.find();
  res.json(products);

});

router.get('/filter', (req, res) => {
  res.send('Soy un filtro');
})

router.get('/:id', (req, res) => {
  // Destructuracion de objetos
  const {id} = req.params;
  const product = service.findOne(id);
  res.json(product);
});

router.post('/', (req, res) => {
  const body = req.body;

  res.status(201).json({
    message: 'Created',
    data: body,
  })
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
const body = req.body;

  res.json(
    {
      message: `Product with id: ${id}, UPDATED`,
      data: body,
    }
  );
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

    res.json(
      {
        message: `Product with id: ${id}, DELETED`,
        id: id,
      }
    );
});

module.exports = router;
