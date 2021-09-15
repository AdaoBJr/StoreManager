const { Router } = require('express');

const salesController = require('../controllers/salesController');

const router = Router();

router.get('/sales/:id', () => console.log('get by id'));
router.get('/sales', salesController.AllSales);

router.post('/sales',
salesController.validQuantity,
salesController.creteSales);

module.exports = router;
