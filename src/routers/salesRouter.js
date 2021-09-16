const { Router } = require('express');

const salesController = require('../controllers/salesController');

const router = Router();

router.post('/', salesController.addSale);

module.exports = router;
