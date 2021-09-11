const { Router } = require('express');
const {
  createNewProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} = require('../controllers/products.controller');
const {
  productAlreadyExists,
  isValidProductName,
  isValidProductQuantity,
  isValidProductId,
} = require('../middlewares/products.middlewares');

const routes = new Router();

routes.get('/', (_req, res) => {
  res.send();
});

routes.post('/products',
  productAlreadyExists,
  isValidProductName,
  isValidProductQuantity,
  createNewProduct);

routes.get('/products',
getAllProducts);

routes.get('/products/:id',
isValidProductId,
getProductById);

routes.put('/products/:id',
  isValidProductName,
  isValidProductQuantity,
  updateProduct);

module.exports = routes;