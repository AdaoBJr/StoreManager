const express = require('express');

const router = express.Router();

const salesController = require('../controllers/salesController');
const { checkQuantity } = require('../middlewares/salesMiddleware');
// const {
//   checkQuantity,
//   checkNameLength,
//   checkProductExist,
// } = require('../middlewares/productMiddleware');

// router.delete('/:id', salesController.deleteProduct);

// router.put();

// router.get('/:id', salesController.getxProductById);

router.get('/:id', salesController.getSaleById);

router.get('/', salesController.getSales);

router.post('/', checkQuantity, salesController.registerSale);

module.exports = router;
