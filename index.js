const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const { 
  validateName,
  validateQuantity,
} = require('./validate');

const {
  create,
  productId,
  getAllProducts,
  updateProducts,
  deleteProductsId,
} = require('./models');

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', [validateName, validateQuantity, create]);

app.get('/products', [getAllProducts]);

app.get('/products/:id', [productId]);

app.put('/products/:id', [validateName, validateQuantity, updateProducts]);

app.delete('/products/:id', [deleteProductsId]);
