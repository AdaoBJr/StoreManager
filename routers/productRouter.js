const express = require('express');

const router = express.Router();
const prodController = require('../controllers/productsController');

router.post('/',
prodController.validateName,
prodController.validateQuantity,
prodController.validateExistance,
prodController.addNewProduct);

module.exports = router;
