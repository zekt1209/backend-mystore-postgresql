const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();

// Logica de negocio
const UsersService = require('./../services/user-service');
const service = new UsersService();

// Endpoints de Usuarios
router.get('/', (req, res) => {

  const { limit, offset } = req.query;

  if (limit && offset) {

    res.json(
      {
        limit,
        offset,
      }
    );

  } else {
    const users = service.find();
    res.json(users);
  }

});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = service.findOne(id);

  if (!user) {
    res.status(404).json({message: `El usuario con id ${id} no existe`});
  } else {
    res.json(user);
  }

});

router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: 'user CREATED',
    data: body,
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  res.json({
    message: `user with id: ${id} MODIFIED`,
    data: body,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    message: `user with id: ${id} DELETED`,
    id,
  });
});

module.exports = router;
