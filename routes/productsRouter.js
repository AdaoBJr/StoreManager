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

router.put('/:id', checkiDInputed, checkNewProductInput, productsController.updateProduct);

router.delete('/:id', checkiDInputed, productsController.deleteProductById);

module.exports = router;