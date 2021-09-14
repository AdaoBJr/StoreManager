const express = require('express');
const bodyParser = require('body-parser');
const {
  addProduct,
  listAllProducts,
  listProductById,
  updateProductById,
} = require('./Controllers/Products');

const { validateName, validateQuantity } = require('./middlwares');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.put('/producst/:id', validateName, validateQuantity, updateProductById);

app.get('/products/:id', listProductById);

app.get('/products', listAllProducts);

app.post('/products', validateName, validateQuantity, addProduct);

app.listen(PORT, () => console.log(`Online na porta ${PORT}`));
