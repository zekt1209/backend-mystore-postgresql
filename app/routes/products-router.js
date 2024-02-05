const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();

// Products
router.get('/', (req, res) => {

  const products = [];
  const { size } = req.query;
  const limit = size || 10;

  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url(),
    });
  }

  res.json(products);

});

router.get('/filter', (req, res) => {
  res.send('Soy un filtro');
})

router.get('/:id', (req, res) => {
  // Destructuracion de objetos
  const {id} = req.params;
  res.json({
    id,
    name: 'Product 2',
    price: 800,
  });
});

router.post('/', (req, res) => {
  const body = req.body;

  res.send({
    message: 'Created',
    data: body,
  })
});

module.exports = router;
