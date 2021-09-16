const express = require('express');
const bodyParser = require('body-parser');

const {
  validateName,
  productExists,
  validateQuantity,
  validateId } = require('./middlewares/productMiddlewares');

const salesMiddleware = require('./middlewares/saleMiddlewares');

const {
  createProduct,
  getAllProducts,
  updateProduct,
  excludeProduct,
  getProductById } = require('./controllers/productsController'); 

const salesController = require('./controllers/salesController');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', getAllProducts);
app.get('/products/:id', validateId, getProductById);
app.get('/sales', salesController.getAll);
app.get('/sales/:id', salesMiddleware.saleExists, salesController.findSaleById);

app.post(
  '/products',
  validateName,
  productExists,
  validateQuantity,
  createProduct,
  );

app.post('/sales', salesMiddleware.validateQuantity, salesController.createSale);

app.put(
  '/products/:id',
  validateName,
  validateQuantity,
  updateProduct,
  );

app.put('/sales/:id', salesMiddleware.validateQuantity, salesController.updateSale);

app.delete(
  '/products/:id',
  excludeProduct,
  );

app.delete('/sales/:id', salesMiddleware.validateId, salesController.deleteSale);

app.listen(3000, () => console.log('online na porta 3000'));
