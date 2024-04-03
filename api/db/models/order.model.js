const {Model, DataTypes, Sequelize} = require('sequelize');

const ORDER_TABLE = 'purchase_orders';

const OrderSchema = {
  id: {
    allowNull: false,
    // autoIncrement: true,
    primaryKey: true,
    type: DataTypes.STRING
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  total: {
    allowNull: false,
    type: DataTypes.STRING
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
    // defaultValue: Sequelize.DATE,
  }
}

// la clase Model, tiene todos los metodos con los que podremos hacer los queries.

class Order extends Model {
  // Aqui definiremos todas las relaciones (Proximamente ...)
  static associate() {
    // associate
  }

  // Aqui vamos a recibir una conexion y retornar una configuracion
  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timeStamps: false
    }
  }
}

module.exports = { ORDER_TABLE, OrderSchema, Order };
