const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.delete('/:id', productsController.deleteWithId);
router.post('/', productsController.newProduct);
router.get('/', productsController.allProducts);
router.get('/:id', productsController.productWithId);
router.put('/:id', productsController.updateWithId);

module.exports = router;
