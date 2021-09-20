const express = require('express');
const productsController = require('../controllers/productsController');
const errorMiddleware = require('../middlewares/error');

const router = express.Router();

router.post('/', productsController.createProduct);
router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);
router.use(errorMiddleware);

module.exports = router;