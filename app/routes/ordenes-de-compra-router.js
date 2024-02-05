const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();

// Ordenes de compra
router.get('/', (req, res) => {
  res.json(
    [
      {
        id: 1,
        name: 'Orden 1',
        total: 1200,
      },
      {
        id: 2,
        name: 'Orden 2',
        total: 300,
      },
      {
        id: 3,
        name: 'Orden 3',
        total: 4500,
      }
    ]
  );
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json(
      {
        id,
        name: 'Orden 1',
        total: 1200,
      }
  );
});

router.get('/:orderId/products', (req, res) => {
  const { orderId } = req.params;
  res.json(
      {
        orderId,
        name: 'Orden 1',
        total: 1200,
        products: [
            {
              name: 'Product 1',
              price: 1000,
            },
            {
              name: 'Product 2',
              price: 800,
            },
        ]
      }
  );
});

router.post('/', (req, res) => {
  const body = req.body;

  res.json({
    message: 'purchase order CREATED',
    data: body,
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  res.json({
    message: `purchase order with id: ${id} UPDATED`,
    data: body,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    message: `purchase order with id: ${id} DELETED`,
    id,
  });
});

module.exports = router;
