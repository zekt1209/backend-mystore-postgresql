const express = require('express');

const productsRouter = require('./products-router');
const categoriesRouter = require('./categories-router');
const usersRouter = require('./users-router');
const ordensRouter = require('./ordenes-de-compra-router');
const customerRouter = require('./customers-router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/ordenes-de-compra', ordensRouter);
  router.use('/customers', customerRouter);
}

module.exports = routerApi;
