const express = require('express');
const bodyParser = require('body-parser');

const {
  validateName,
  productExists,
  validateQuantity,
  validateId } = require('./middlewares/productMiddlewares');

const {
  createProduct,
  getAllProducts,
  getProductById } = require('./controllers/productsController'); 

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', getAllProducts);
app.get('/products/:id', validateId, getProductById);

app.post(
  '/products',
  validateName,
  productExists,
  validateQuantity,
  createProduct,
  );

app.listen(3000, () => console.log('online na porta 3000'));
