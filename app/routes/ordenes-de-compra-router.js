const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();

// Logica de negocio
const OrdersService = require('./../services/orders-service');
const service = new OrdersService();

// Middleware dinamico
const validatorHandler = require('../middlewares/validator-handler');

// Schemas for DTO Validators
const { createOrderSchema, updateOrderSchema, getOrderSchema, deleteOrderSchema } = require('../schemas/order-schema');
const { getProductSchema } = require('../schemas/product-schema');

// Endpoints Ordenes de compra
router.get('/', async (req, res) => {

  const purchaseOrders = await service.find();
  res.json(purchaseOrders);

});

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const purchaseOrder = await service.findOne(id);

    if (!purchaseOrder) {
      res.status(404).json({message: `La orden de compra con id ${id} no existe`});
    } else {
      res.json(purchaseOrder);
    }

  }
);

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

router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newOrder = await service.create(body);

    res.status(201).json({
      message: 'purchase order CREATED',
      data: newOrder,
    });
  }
);

router.patch('/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res) => {
    try {

      const { id } = req.params;
      const body = req.body;
      const changedOrder = await service.update(id, body);

      res.json({
        message: `purchase order with id: ${id} UPDATED`,
        data: changedOrder,
      });

    } catch (err) {
      res.json({ message: err.message });
    }
  }
);

router.delete('/:id',
  validatorHandler(deleteOrderSchema, 'params'),
  async (req, res) => {
    try {

      const { id } = req.params;
      const deletedOrderId = await service.delete(id);

      res.json({
        message: `purchase order with id: ${id} DELETED`,
        id: deletedOrderId,
      });

    } catch (err) {
      res.json({ message: err.message });
    }
  }
);

module.exports = router;
