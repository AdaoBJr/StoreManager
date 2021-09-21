const { Router } = require('express');
const {
        authLengthName,
        productExists,
        findProduct,
        authQuantity,
        wrongId,
} = require('../middlewares/productsMiddlewares');

const {
        listAll,
        productById,
        updateProduct,
        deleteProduct,
} = require('../controllers/productsControllers');

const routes = new Router();

routes.post('/products',
    authLengthName,
    productExists,
    findProduct,
    authQuantity);

routes.get('/products', listAll);

routes.get('/products/:id', wrongId, productById);

routes.put('/products/:id', authLengthName,
authQuantity, updateProduct);

routes.delete('/products/:id', deleteProduct);

module.exports = routes;
