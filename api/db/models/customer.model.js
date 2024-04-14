const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  lastName: {
    allowNull: false,
    field: 'last_name',
    type: DataTypes.STRING
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING
  },
  userId: {
    field: 'user_id',
    allowNull: true,
    type: DataTypes.STRING,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    // Que sucede cuando se actualiza el registro en 'user' con este ID? :
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

class Customer extends Model {

  // Aqui definiremos todas las relaciones (Proximamente ...)
  static associate(models) {
    // associate
    this.belongsTo(models.User, {as: 'user'});
  }

  // Aqui vamos a recibir una conexion y retornar una configuracion
  static config(sequelize) {

    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timeStamp: false
    }

  }

}

module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer };
