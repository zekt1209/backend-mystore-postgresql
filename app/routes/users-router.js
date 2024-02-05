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

module.exports = router;
