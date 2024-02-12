const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();

// Logica de negocio
const ProductsService = require('./../services/product-service');
const service = new ProductsService();

// Middleware Dinamico
const validatorHandler = require('../middlewares/validator-handler');
// Schemas for DTO Validators
const { createProductSchema, updateProductSchema, getProductSchema, deleteProductSchema } = require('../schemas/product-schema');

// Middleware example
// router.use('/', (req, res, next) => {
//   console.log('Request Type:', req.method)
//   next()
// })

// Endpoints de Products
router.get('/', async (req, res) => {

  const products = await service.find();
  res.json(products);

});

router.get('/filter', (req, res) => {
  res.send('Soy un filtro');
})

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {

      // Destructuracion de objetos
      const {id} = req.params;
      const product = await service.findOne(id);

      if (!product) {
        res.status(404).json({message: `El producto con id ${id} no existe`});
      } else {
        res.json(product);
      }

    } catch (err) {
      next(err);
    }

  }
);

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {

    const body = req.body;
    const newProduct = await service.create(body);

    res.status(201).json({ message: 'Created', data: newProduct })

  }
);

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {

    try {

      const { id } = req.params;
      const body = req.body;
      const changedProduct = await service.update(id, body);

      res.json({ message: `Product with id: ${id}, UPDATED`, data: changedProduct });

    } catch (err) {
      // res.status(404).json({ message: err.message});
      next(err);
    }

  }
);

router.delete('/:id',
  validatorHandler(deleteProductSchema, 'params'),
  async (req, res) => {
    try {

      const { id } = req.params;
      const deletedProductId = await service.delete(id);

        res.json(
          {
            message: `Product with id: ${id}, DELETED`,
            id: deletedProductId
          }
        );

    } catch (err) {
      res.status(404).json({ message: err.message});
    }
  }
);

module.exports = router;
