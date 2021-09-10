const express = require('express');
const bodyParser = require('body-parser');

const ProductService = require('./services/ProductService');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});

app.post('/products', async (req, res) => {
  const { name, quantity } = req.body;
  const product = await ProductService.create(name, quantity);
  res.send(product);
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
