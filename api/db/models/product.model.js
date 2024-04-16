const {Model, DataTypes, Sequelize} = require('sequelize');

const PRODUCT_TABLE = 'products';
const { CATEGORY_TABLE } = require('./category.model');

const ProductSchema = {
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
  price: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING
  },
  categoryId: {
    field: 'category_id',
    allowNull: true,
    type: DataTypes.STRING,
    references: {
      model: CATEGORY_TABLE,
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
    // defaultValue: Sequelize.DATE,
},
}

// la clase Model, tiene todos los metodos con los que podremos hacer los queries.

class Product extends Model {
  // Aqui definiremos todas las relaciones (Proximamente ...)
  static associate(models) {
    // associate
    this.belongsTo(models.Category, { as: 'category' });
  }

  // Aqui vamos a recibir una conexion y retornar una configuracion
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timeStamps: false
    }
  }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product };
