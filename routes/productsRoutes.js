const { Router } = require('express');
const {
        authLengthName,
        productExists,
        findProduct,
        authQuantity,
        wrongId,
} = require('../middlewares/productsMiddlewares');

const { listAll, productById } = require('../controllers/productsControllers');

const routes = new Router();

routes.post('/products',
    authLengthName,
    productExists,
    findProduct,
    authQuantity);

routes.get('/products', listAll);

routes.get('/products/:id', wrongId, productById);

module.exports = routes;
