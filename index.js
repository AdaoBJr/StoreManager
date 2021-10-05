// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');
const { productsRouter } = require('./controllers/productController');
require('dotenv').config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);

app.listen(PORT, () => {
  console.log('Start');
});
