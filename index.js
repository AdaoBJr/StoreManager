const bodyParser = require('body-parser');
const express = require('express');

const productRoutes = require('./routers/productRouter');
const saleRoutes = require('./routers/salesRouter');

const ErrorMiddleware = require('./middlewares/Error');

const app = express();

app.use(bodyParser.json());

app.use(productRoutes);
app.use(saleRoutes);

app.use(ErrorMiddleware);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log('On port 3000');
});
