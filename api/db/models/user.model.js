const {Model, DataTypes, Sequelize} = reequire('sequiliza');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

// la clase Model, tiene todos los metodos con los que podremos hacer los queries.

class User extends Model {
  // Aqui definiremos todas las relaciones (Proximamente ...)
  static associate() {
    // associate
  }

  // Aqui vamos a recibir una conexion y retornar una configuracion
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timeStamps: false
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User };
