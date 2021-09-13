const express = require('express');

const router = express.Router();
const salesController = require('../controllers/salesController');

router.post('/', salesController.createSale);
// router.post('/', productController.createProduct);
module.exports = router;