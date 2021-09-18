const express = require('express');
const bodyParser = require('body-parser');
const {
  addProduct,
  listAllProducts,
  listProductById,
  updateProductById,
  deleteProductById,
} = require('./Controllers/Products');

const {
  requestSalesList,
  requestSaleById,
  requestDeleteSaleById,
  requestNewSales,
  requestUpdateSale,
} = require('./Controllers/Sales');

const {
  validateName,
  validateQuantity,
  validateProductId,
  validateProductQuantity } = require('./middlwares');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products/:id', listProductById);

app.get('/products', listAllProducts);

app.post('/products', validateName, validateQuantity, addProduct);

app.put('/products/:id', validateName, validateQuantity, updateProductById);

app.delete('/products/:id', deleteProductById);

app.put('/sales/:id', validateProductId, validateProductQuantity, requestUpdateSale);

app.delete('/sales/:id', requestDeleteSaleById);

app.get('/sales/:id', requestSaleById);

app.get('/sales', requestSalesList);

app.post('/sales', validateProductId, validateProductQuantity, requestNewSales);

app.listen(PORT, () => console.log(`Online na porta ${PORT}`));
