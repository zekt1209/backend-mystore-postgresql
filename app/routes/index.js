const productsRouter = require('./products-router');
const categoriesRouter = require('./categories-router');
const usersRouter = require('./users-router');
const ordensRouter = require('./ordenes-de-compra-router');

function routerApi(app) {
  app.use('/api/products', productsRouter);
  app.use('/api/categories', categoriesRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/ordenes-de-compra', ordensRouter);
}

module.exports = routerApi;
