const express = require('express');
const bodyParser = require('body-parser');
const ProductsModel = require('./models/ProductsModel');

const app = express();

app.use(bodyParser.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// ------------------------------------------------------------------
// Requisito 1

app.post('/products', async (req, res) => {
  const { name, quantity } = req.body; // Incluir middleware de validação antes da rota

  const newProduct = await ProductsModel.postProducts(name, quantity);

  if (!newProduct) {
    res.status(400).json({ message: res.message }); 
  }

  res.status(201).json(newProduct);
});

app.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});