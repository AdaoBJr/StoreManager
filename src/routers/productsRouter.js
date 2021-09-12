const { Router } = require('express');

const { validateNameLength, validateQuantityType, validateQuantityAmount,
} = require('../../middlewares');

const { registerProduct, listAllProducts } = require('../controllers/productsController');

const router = Router();

router.get('/', listAllProducts);

router.post('/', validateNameLength, validateQuantityType, validateQuantityAmount, registerProduct);

module.exports = router;
