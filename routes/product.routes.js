const { Router } = require('express');
const { createProduct, listAll, productById,
  updateProduct, deleteProduct } = require('../controllers/produtos.controller');
const { productIsValid, isValidName,
  isValidQuantity, isValidProduct } = require('../middlewares/produtos.middlewares');

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

routes.get('/products', listAll);

routes.get('/products/:id', isValidProduct, productById);

routes.put('/products/:id', isValidName,
isValidQuantity, updateProduct);

routes.delete('/products/:id', deleteProduct);

module.exports = routes;
