console.log('My App');
const express = require('express');
const app = express();
const port = 3000;

// Rise EndPoint
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Products
app.get('/products', (req, res) => {
  res.json(
    [
      {
        name: 'Product 1',
        price: 1000,
      },
      {
        name: 'Product 2',
        price: 800,
      },
      {
        name: 'Product 3',
        price: 500,
      },
      {
        name: 'Product 4',
        price: 1400,
      },
    ]
    );
});

app.get('/products/:id', (req, res) => {
  // Destructuracion de objetos
  const {id} = req.params;
  res.json({
    id,
    name: 'Product 2',
    price: 800,
  });
});

// Categories
app.get('/categories', (req, res) => {
  res.json(
    [
      {
        id: 1,
        name: 'Perifericos'
      },
      {
        id: 2,
        name: 'Hardware'
      },
      {
        id: 3,
        name: 'Software'
      }
    ]
  );
});

app.get('/categories/:id', (req, res) => {
  const { id } = req.params;
  res.json(
    {
      id,
      name: 'Perifericos',
      products: [
        {
          name: 'Product 1',
          price: 1000,
        },
        {
          name: 'Product 2',
          price: 800,
        },
      ]
    }
  );
});

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const {categoryId, productId} = req.params;
  res.json({
    categoryId,
    productId,
  });
});

// Ordenes de compra
app.get('/ordenes-de-compra', (req, res) => {
  res.json(
    [
      {
        id: 1,
        name: 'Orden 1',
        total: 1200,
      },
      {
        id: 2,
        name: 'Orden 2',
        total: 300,
      },
      {
        id: 3,
        name: 'Orden 3',
        total: 4500,
      }
    ]
  );
});

app.get('/ordenes-de-compra/:id', (req, res) => {
  const { id } = req.params;
  res.json(
      {
        id,
        name: 'Orden 1',
        total: 1200,
      }
  );
});

app.get('/ordenes-de-compra/:orderId/products', (req, res) => {
  const { orderId } = req.params;
  res.json(
      {
        orderId,
        name: 'Orden 1',
        total: 1200,
        products: [
            {
              name: 'Product 1',
              price: 1000,
            },
            {
              name: 'Product 2',
              price: 800,
            },
        ]
      }
  );
});

// Usuarios
app.get('/users', (req, res) => {
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
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  res.json(
    {
      id,
      name: 'Victor',
      email: "victor@hotmail.com",
    }
  );
});

// hiddenPage
app.get('/hiddenPage', (req, res) => {
  res.sendFile("./public/hiddenPage.html", { root: __dirname });
})

app.listen(port, () => {
  console.log(`My App running at http://localhost:${port}`);
});
