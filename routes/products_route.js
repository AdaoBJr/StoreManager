const { Router } = require('express');
const { createProduct, getAllProducts, getProductById, updateProduct, removeById,
} = require('../controllers/product_controller');
const { 
    NameValidation, ExistingProduct, QuantityValidation, IdValidation,
} = require('../middlewares/product_midd');

const routes = new Router();

// não remova esse endpoint, e para o avaliador funcionar
routes.get('/', (_request, response) => {
    response.send();
  });

routes.post('/products', NameValidation, ExistingProduct, QuantityValidation, createProduct);
routes.get('/products', getAllProducts);
routes.get('/products/:id', IdValidation, getProductById);
routes.put('/products/:id', NameValidation, QuantityValidation, updateProduct);
routes.delete('/products/:id', IdValidation, removeById);

module.exports = routes; 