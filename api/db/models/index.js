// Se va a encargar de enviar la conexion a los modelos y con esto va a poder hacer el mapeo y la insersion de data
// Aqui en index.js va a estar toda la config y setup inicial de sequelize con los modelos
const { User, UserSchema } = require('./user.model');

// Aqui tendremos el setUp de todos nuestros modelos, de momento solo tenemos el de User

const { Product, ProductSchema } = require('./product.model');
const { Category, CategorySchema } = require('./category.model');
const { Order, OrderSchema } = require('./order.model');
const { Customer, CustomerSchema } = require('./customer.model');

const { config } = require('dotenv');

function setupModels(sequelize) {
  // 1- Como config es un metodo estatico, no necesitamos declarar una instancia y podemos llamarlo directo
  // 2- Mismo caso con init, como es un metodo estatico que viene con la clase Model y lo hereda User, podemos llamarlo directo
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  // Asociaciones
  Customer.associate(sequelize.models);
  User.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);

}

module.exports = setupModels;
