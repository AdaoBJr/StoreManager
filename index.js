const express = require('express');
const bodyParser = require('body-parser');
const productModels = require('./model/productsModel');

const app = express();

require('dotenv').config();

app.use(bodyParser.json());

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', async (request, response) => {
  const { name, quantity } = request.body;
  const createdProduct = await productModels.create(name, quantity);
  response.status(201).json(createdProduct);
});

app.listen(PORT, () => {
  console.log('Online');
});
