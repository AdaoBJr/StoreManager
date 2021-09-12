const express = require('express');

const router = express.Router();

const salesController = require('../controllers/salesController');
// const {
//   checkQuantity,
//   checkNameLength,
//   checkProductExist,
// } = require('../middlewares/productMiddleware');

// router.delete('/:id', salesController.deleteProduct);

// router.put();

// router.get('/:id', salesController.getProductById);

// router.get('/', salesController.getProducts);

router.post('/', salesController.registerSale);

module.exports = router;
