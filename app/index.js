const express = require('express');
const app = express();
const port = 3000;
// Middlewares de error
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error-handler');

const routerApi = require('./routes/index');
app.use(express.json());


// Middleware rise endpoint
app.get('/', (req, res, next) => {
  console.log('Hello world from Middleware!');
  req.customParamV = 'Hey!';
  next();
}, (req, res, next) => {
  console.log('Another middleware in the rise path! I will print a custom request Header')
  console.log(req.customParamV);
  next();
});

// Rise EndPoint
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

// hiddenPage
app.get('/hiddenPage', (req, res) => {
  res.sendFile("./public/hiddenPage.html", { root: __dirname });
})

// Endpoints base que mandan llamar sus routers cada una
routerApi(app);

// Llamando a los middlewares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`My App running at http://localhost:${port}`);
});
