const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
// Middlewares de error
const { logErrors, ormErrorHandler, errorHandler, boomErrorHandler } = require('./middlewares/error-handler');

const routerApi = require('./routes/index');

// Evita problemas con peticiones POST o donde tengamos que enviar un body
app.use(express.json());

// --- Dar acceso a ciertos dominios que no sean de nuestro origen -----
const whiteList = ['http://localhost:8080', 'http://localhost:5500', 'https://backend-mystore-mysql.vercel.app'];

const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    }
    else {
      callback(new Error('No permitido'), false);
    }
  }
};

app.use(cors(options));
// ---------------------------------------------------------------------

// Middleware rise endpoint
app.get('/api', (req, res, next) => {
  console.log('Hello world from Middleware!');
  req.customParamV = 'Hey!';
  next();
}, (req, res, next) => {
  console.log('Another middleware in the rise path! I will print a custom request Header')
  console.log(req.customParamV);
  next();
});

// Rise EndPoint
app.get('/api', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

// hiddenPage
app.get('/api/hiddenPage', (req, res) => {
  res.sendFile("./public/hiddenPage.html", { root: __dirname });
})

// Endpoints base que mandan llamar sus routers cada una
routerApi(app);

// Llamando a los middlewares
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);



app.listen(port, () => {
  console.log(`My App running at http://localhost:${port}`);
});

// hello world
