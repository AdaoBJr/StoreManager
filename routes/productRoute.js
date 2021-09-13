const { Router } = require('express');

const { productValid, validName,
  validQuantity, validateProduct } = require('../middlewares/productMiddlewares');
const { createProduct, allProducts,
  getProductById, updatedSucessfully, deleteProduct } = require('../controllers/productController');

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

routes.get('/products', allProducts);

routes.get('/products/:id', validateProduct, getProductById);

routes.put('/products/:id', validName, validQuantity, updatedSucessfully);

routes.delete('/products/:id', deleteProduct);

module.exports = routes;
