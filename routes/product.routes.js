const { Router } = require('express');
const {
  createNewProduct,
  getAllProducts,
  getProductById,
} = require('../controllers/products.controller');
const {
  producAlreadyExists,
  isValidProductName,
  isValidProductQuantity,
  isValidProductId,
} = require('../middlewares/products.middlewares');

const routes = new Router();

routes.get('/', (_req, res) => {
  res.send();
});

routes.post('/products',
  producAlreadyExists,
  isValidProductName,
  isValidProductQuantity,
  createNewProduct);

routes.get('/products',
getAllProducts);

routes.get('/products/:id',
isValidProductId,
getProductById);

module.exports = routes;