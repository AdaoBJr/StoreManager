const { Router } = require('express');
const { createProduct } = require('../controllers/product_controller');
const { 
    NameValidation, ExistingProduct, QuantityValidation,
} = require('../middlewares/product_midd');

const routes = new Router();

// não remova esse endpoint, e para o avaliador funcionar
routes.get('/', (_request, response) => {
    response.send();
  });

routes.post('/products', NameValidation, ExistingProduct, QuantityValidation, createProduct);

module.exports = routes; 