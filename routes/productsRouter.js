const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.post('/', 
productsController.validName, 
productsController.validQuantity,
productsController.createProducts);

module.exports = router;