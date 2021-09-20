const { Router } = require('express');
const { createProduct, findAll, findOneP } = require('../controllers/ProductsControllers');
const {
  isValidName,
  productExists,
  isValidQuantity,
  isValidProduct,
} = require('../middlewares/ProductsMiddlewares');

const routes = new Router();

// não remova esse endpoint, e para o avaliador funcionar
routes.get('/', (_request, response) => {
  response.send();
});

routes.get('/products', findAll);
routes.get('/products/:id', isValidProduct, findOneP);

routes.post('/products', isValidName, productExists, isValidQuantity, createProduct);

module.exports = routes;
