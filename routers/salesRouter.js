const express = require('express');

const router = express.Router();
const salesController = require('../controllers/salesController');

router.post('/', salesController.createSale);
router.get('/:id', salesController.getSalesById);
router.get('/', salesController.getAll);
router.put('/:id', salesController.update);
router.delete('/:id', salesController.exclude);

// router.post('/', productController.createProduct);
module.exports = router;