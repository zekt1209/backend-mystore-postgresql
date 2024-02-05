const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();

// Logica de negocio
const OrdersService = require('./../services/orders-service');
const service = new OrdersService();

// Endpoints Ordenes de compra
router.get('/', (req, res) => {

  const purchaseOrders = service.find();
  res.json(purchaseOrders);

});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const purchaseOrder = service.findOne(id);
  res.json(purchaseOrder);
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
