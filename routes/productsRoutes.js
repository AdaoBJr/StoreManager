const { Router } = require('express');
const {
        authLengthName,
        productExists,
        findProduct,
        authQuantity,
} = require('../middlewares/productsMiddlewares');

const routes = new Router();

routes.post('/products',
    authLengthName,
    productExists,
    findProduct,
    authQuantity);

module.exports = routes;
