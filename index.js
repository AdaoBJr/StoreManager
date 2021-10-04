// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');
const bodyParser = require('body-parser');
const { productsRouter } = require('./controllers/productController');

const app = express();

require('dotenv').config();

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);

app.listen(PORT, () => {
  console.log('Start');
});
