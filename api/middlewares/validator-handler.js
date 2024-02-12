const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  // Middleware dinamico (schema y req.property) dependiendo del http method
  // { req.params, req.query, req.body }

  // Closure para lograr middleware dinamico
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      // Manejo de errores con boom
      next(boom.badRequest(error));
    }
    next();
  }
};

module.exports = validatorHandler;
