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
      id: faker.string.nanoid(4),
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

  if (id == '999') {
    res.status(404).json({
      message: 'Not fount',
    });
  } else {
    res.json({
      id,
      name: 'Product 2',
      price: 800,
      image: faker.image.url(),
    });
  }

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
