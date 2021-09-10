const express = require('express');

const router = express.Router();
const productsController = require('../controllers/productsController');

router.post('/',
productsController.validName,
productsController.validQuantity,
productsController.verifyExistance,
productsController.addNewProduct);

module.exports = router;