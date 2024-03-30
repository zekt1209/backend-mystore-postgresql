// Se va a encargar de enviar la conexion a los modelos y con esto va a poder hacer el mapeo y la insersion de data
// Aqui en index.js va a estar toda la config y setup inicial de sequelize con los modelos
const { User, UserSchema } = require('./user.model');

// Aqui tendremos el setUp de todos nuestros modelos, de momento solo tenemos el de User

/* const { User, UserSchema } = require('./user.model');
const { User, UserSchema } = require('./user.model');
const { User, UserSchema } = require('./user.model'); */

function setupModels(sequelize) {
  // 1- Como config es un metodo estatico, no necesitamos declarar una instancia y podemos llamarlo directo
  // 2- Mismo caso con init, como es un metodo estatico que viene con la clase Model y lo hereda User, podemos llamarlo directo
  User.init(UserSchema, User.config(sequelize));

}

module.exports = setupModels;
