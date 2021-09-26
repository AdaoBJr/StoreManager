const express = require('express');

const ProductsController = require('../controllers/ProductsController');
const dataValidationOf = require('../middlewares/DataValidation');
const checkIf = require('../middlewares/CheckExistence');

const router = express.Router();

router.get('/', ProductsController.getAll);

router.post('/', dataValidationOf.productCreation, checkIf.productExists, ProductsController.create);

module.exports = router;
