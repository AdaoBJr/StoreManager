const { Router } = require('express');
const { createProduct } = require('../controllers/produtos.controller');
const { productIsValid, isValidName,
  isValidQuantity } = require('../middlewares/produtos.middlewares');

const routes = new Router();

// não remova esse endpoint, e para o avaliador funcionar
routes.get('/', (_request, response) => {
  response.send();
});

routes.post('/products',
  productIsValid,
    isValidName,
      isValidQuantity,
        createProduct);

module.exports = routes;
