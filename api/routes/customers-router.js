// Logica de express
const express = require('express');
const router = express.Router();

// Llamado a logica de negocio
const CustomerService = require('../services/customer-service');
const service = new CustomerService();

// Middleware dinamico
const validatorHandler = require('../middlewares/validator-handler');

// Schemas for DTO Validators
const { createCustomerSchema, updateCustomerSchema, getCustomerSchema, deleteCustomerSchema } = require('../schemas/customer-schema');

// Endpoints de Customers
router.get('/', async (req, res) => {

  const { limit, offset } = req.query;

  if (limit && offset) {
    res.json(
      {
        limit,
        offset,
      }
    );
  } else {
    const customers = await service.find();
    res.json(customers);
  }

});

router.get('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async(req, res) => {

    const { id } = req.params
    const customer = await service.findOne(id);

    // Not found validation
    if  (!customer) {
      res.status(404).json({message: `CustomMessage in router: El customer con id ${id} no existe en la DB`});
    } else {
      res.json(customer);
    }

  }
);

router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async(req, res) => {

    try {

      const body = req.body;
      const newCustomer = await service.create(body);

      res.status(201).json({
        message: `CustomMessage in router: customer CREATED`,
        data: newCustomer
      });

    } catch (err) {
      res.status(404).json({message: `CustomMessage in router: request failed on function: POST`,
    error: err});
    }


  }
);

router.patch('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async(req, res) => {

    try {

      const { id } = req.params;
      const body = req.body;
      const changedCustomer = await service.update(id, body);

      res.json({
        message: `CustomMessage in router: customer with id: ${id} MODIFIED`,
        data: changedCustomer,
      });

    } catch (err) {
      res.status(404).json({message: `CustomMessage in router: request failed on function: PATCH`});
    }

  }
);

router.delete('/:id',
  validatorHandler(deleteCustomerSchema, 'params'),
  async(req, res) => {

    try {

      const { id } = req.params;
      const deletedUserId = await service.delete(id);

      res.json({
        message: `CustomMessage in router: customer with id: ${id} DELETED`,
        id: deletedUserId
      });

    } catch (err) {
      res.status(404).json({ message: err.message });
    }

  }
)


module.exports = router;
