const { Router } = require('express');
const {
  // Controllers
  createProduct, findAll, findOneP, updateProductById, deleteProductById,
} = require('../controllers/ProductsControllers');

const {
  // Middlewares
  isValidName, productExists, isValidQuantity, isValidProduct,
} = require('../middlewares/ProductsMiddlewares');

const routes = new Router();

// não remova esse endpoint, e para o avaliador funcionar
routes.get('/', (_request, response) => {
  response.send();
});

// Consultar dados
routes.get('/products', findAll);
routes.get('/products/:id', isValidProduct, findOneP);

// Inserir dados
routes.post('/products', isValidName, productExists, isValidQuantity, createProduct);

// Atualizar dados
routes.put('/products/:id', isValidName, isValidQuantity, updateProductById);

// Deletar dados
routes.delete('/products/:id', deleteProductById);

module.exports = routes;
