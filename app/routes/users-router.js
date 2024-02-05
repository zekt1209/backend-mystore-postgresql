const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();

// Usuarios
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

    res.json(
      [
        {
          id: 1,
          name: 'Victor',
          email: "victor@hotmail.com",
        },
        {
          id: 2,
          name: 'Marco',
          email: "marco@hotmail.com",
        },
        {
          id: 3,
          name: 'Angel',
          email: "angel@gmail.com",
        }
      ]
    );
  }

});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json(
    {
      id,
      name: 'Victor',
      email: "victor@hotmail.com",
    }
  );
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
