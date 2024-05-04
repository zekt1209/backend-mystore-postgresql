const { Model, DataTypes, Sequelize } = require('sequelize');
const { ORDER_TABLE } = require('./order.model');
const { PRODUCT_TABLE } = require('./product.model');

const ORDERS_PRODUCTS_TABLE = 'orders-products';

const OrdersProductsSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING
  },
  amount: {
    allowNull: false,
    type: DataTypes.STRING
  },
  orderId: {
    field: 'order_id',
    allowNull: true,
    type: DataTypes.STRING,
    references: {
      model: ORDER_TABLE,
      key: 'id'
    },
    // Que sucede cuando se actualiza el registro en 'order' con este ID? :
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  productId: {
    field: 'product_id',
    allowNull: true,
    type: DataTypes.STRING,
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    },
    // Que sucede cuando se actualiza el registro en 'product' con este ID? :
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: {
    // allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    // allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.NOW
  }

}

// la clase Model, tiene todos los metodos con los que podremos hacer los queries.

class OrdersProducts extends Model {

  // Aqui definiremos todas las relaciones (Proximamente ...)
  static associate(models) {
    // associate
  }

  // Aqui vamos a recibir una conexion y retornar una configuracion
  static config(sequelize) {

    return {
      sequelize,
      tableName: ORDERS_PRODUCTS_TABLE,
      modelName: 'OrdersProducts',
      timeStamp: false
    }

  }

}

module.exports = { ORDERS_PRODUCTS_TABLE, OrdersProductsSchema, OrdersProducts };
