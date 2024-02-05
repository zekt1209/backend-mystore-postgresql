const express = require('express');
const { faker } = require('@faker-js/faker');
const app = express();
const port = 3000;

const routerApi = require('./routes/index');


// Rise EndPoint
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// hiddenPage
app.get('/hiddenPage', (req, res) => {
  res.sendFile("./public/hiddenPage.html", { root: __dirname });
})

// Endpoints base que mandan llamar sus routers cada una
routerApi(app);

app.listen(port, () => {
  console.log(`My App running at http://localhost:${port}`);
});
