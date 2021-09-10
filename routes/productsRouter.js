const express = require('express');
const productsController = require('../controller/productsController');
const checkNewProductInput = require('../middlewares/checkNewProductInput');
const { 
    checkIfNameInputIsTaken, checkiDInputed,
     } = require('../middlewares');

const router = express.Router();

router.post('/', checkNewProductInput, checkIfNameInputIsTaken, productsController.createProduct);

router.get('/:id', checkiDInputed, productsController.getProductById);

router.get('/', productsController.getAllProducts);

module.exports = router;