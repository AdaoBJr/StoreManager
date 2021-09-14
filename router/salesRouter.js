const express = require('express');

const router = express.Router();
const salesController = require('../controllers/salesController');

router.post('/', 
salesController.verifyQuantities,
salesController.createSales);

router.get('/', salesController.getAll);

router.get('/:id', salesController.getById);

router.put('/:id',
 salesController.verifyQuantities,
 salesController.editSale);

module.exports = router;
