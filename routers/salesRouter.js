const express = require('express');

const router = express.Router();

const salesController = require('../controllers/salesController');

router.post('/',
salesController.validateQuantity,
salesController.registerSale);

router.get('/', salesController.getAll);

router.get('/:id', salesController.getById);

router.put('/:id',
salesController.validateQuantity,
salesController.updateSale);

router.delete('/:id',
salesController.deleteSale);

module.exports = router;