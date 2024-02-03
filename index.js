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
  res.send('Products endpoint');
});

// Categories
app.get('/categories', (req, res) => {
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

// Cart
app.get('/cart', (req, res) => {
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
    }
  ]
  );
});

// hiddenPage
app.get('/hiddenPage', (req, res) => {
  res.sendFile("./public/hiddenPage.html", { root: __dirname });
})

app.listen(port, () => {
  console.log(`My App running at http://localhost:${port}`);
});
