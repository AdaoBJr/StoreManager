const express = require('express');
const salesController = require('../controllers/salesController');
const errorMiddleware = require('../middlewares/error');

const router = express.Router();

router.post('/', salesController.createSale);
router.get('/', salesController.getAllSales);
router.get('/:id', salesController.getSaleById);
router.put('/:id', salesController.updateSale);
router.delete('/:id', salesController.deleteSale);
router.use(errorMiddleware);

module.exports = router;