const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();

// Logica de negocio
const UsersService = require('../services/user-service');
const service = new UsersService();

// Middleware dinamico
const validatorHandler = require('../middlewares/validator-handler');

// Schemas for DTO Validators
const { createUserSchema, updateUserSchema, getUserSchema, deleteUserSchema } = require('../schemas/user-schema');

// Endpoints de Usuarios
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
    const users = await service.find();
    res.json(users);
  }

});

router.get("/:id",
  validatorHandler(getUserSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const user = await service.findOne(id);

    if (!user) {
      res.status(404).json({message: `El usuario con id ${id} no existe`});
    } else {
      console.log(id);
      console.log('typeOf: ' + typeof(id));
      res.json(user);
    }

  }
);

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newUser = await service.create(body);

    res.status(201).json({
      message: 'user CREATED',
      data: newUser,
    });
  }
);

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res) => {
    try {

      const { id } = req.params;
      const body = req.body;
      const changedUser = await service.update(id, body);

      res.json({
        message: `user with id: ${id} MODIFIED`,
        data: changedUser,
      });

    } catch (err) {
      res.status(404).json({ message: err.message });
    }

  }
);

router.delete('/:id',
  validatorHandler(deleteUserSchema, 'params'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUserId = await service.delete(id);

      res.json({
        message: `user with id: ${id} DELETED`,
        id: deletedUserId,
      });

    } catch (err) {
      res.status(404).json({ message: err.message });
    }

  }
);

module.exports = router;
