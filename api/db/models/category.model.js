const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING
  },
  name: {
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
    defaultValue: Sequelize.DATE,
  }

}

// la clase Model, tiene todos los metodos con los que podremos hacer los queries.
class Category extends Model {
  static associate() {
      // Aqui definiremos todas las relaciones (Proximamente ...)
  }

  // Aqui vamos a recibir una conexion y retornar una configuracion
  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timeStamp: false
    }
  }
}

module.exports = { CATEGORY_TABLE, CategorySchema, Category };
