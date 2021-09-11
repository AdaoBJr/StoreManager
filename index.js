const express = require('express');
const bodyParser = require('body-parser');
const Product = require('./controller/controllerProducts');

const app = express();
app.use(bodyParser.json());

app.post('/products', async (_req, res) => {
  const products = await Product.create();
  res.status(201).json(products);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => console.log('Aplicação ouvindo na porta 3000'));
