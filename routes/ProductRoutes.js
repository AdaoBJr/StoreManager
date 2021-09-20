const { Router } = require('express');
const { createProduct } = require('../controllers/ProductsControllers');
const {
  isValidName,
  productExists,
  isValidQuantity,
} = require('../middlewares/ProductsMiddlewares');

const routes = new Router();

// não remova esse endpoint, e para o avaliador funcionar
routes.get('/', (_request, response) => {
  response.send();
});

routes.post('/products', isValidName, productExists, isValidQuantity, createProduct);

module.exports = routes;
