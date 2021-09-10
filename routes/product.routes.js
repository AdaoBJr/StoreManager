const { Router } = require('express');
const { createNewProduct } = require('../controllers/products.controller');
const {
  producAlreadyExists,
  isValidProductName,
  isValidProductQuantity,
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

module.exports = routes;