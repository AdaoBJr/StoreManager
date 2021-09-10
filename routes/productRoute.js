const { Router } = require('express');

const { productValid, validName, validQuantity } = require('middlewares');
const { createProduct } = require('../controllers/productController');

const routes = new Router();

// não remova esse endpoint, e para o avaliador funcionar
routes.get('/', (_request, response) => {
  response.send();
});

routes.post('/products',
  productValid,
  validName,
  validQuantity,
  createProduct);

module.exports = routes;
