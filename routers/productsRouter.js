const express = require('express');

const router = express.Router();

const productsController = require('../controllers/productsController');
const { checkName, checkQuantity } = require('../middlewares/productMiddleware');

router.get('/:id', productsController.getProductById);

router.get('/', productsController.getProducts);

router.post('/', checkName, checkQuantity, productsController.registerProduct);

module.exports = router;
