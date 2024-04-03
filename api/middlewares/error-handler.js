const { ValidationErrorItem } = require("sequelize");
const { User } = require("../db/models/user.model");

function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

// Sequelize middleware for error handler
function ormErrorHandler (err, req, res, next) {
  if (err instanceof ValidationError) {
    console.log(" *********************** ************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************");
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    });
  }
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const {output} = err;
    // console.log(err);
    // console.log(err.output);
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
};


module.exports = {
  logErrors,
  ormErrorHandler,
  errorHandler,
  boomErrorHandler,
}
