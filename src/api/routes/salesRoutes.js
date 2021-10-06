const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.post('/', salesController.newSale);
router.get('/', salesController.allSales);
router.get('/:id', salesController.saleWithId);
router.put('/:id', salesController.updateWithId);
router.delete('/:id', salesController.deleteWithId);

module.exports = router;
