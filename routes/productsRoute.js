const express = require('express');
const productsController = require('../controllers/productsController');
const errorMiddleware = require('../middlewares/error');

const router = express.Router();

router.post('/', productsController.createProduct);
router.get('/', productsController.getAllProducts);
router.use(errorMiddleware);

module.exports = router;