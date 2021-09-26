const express = require('express');

const ProductsController = require('../controllers/ProductsController');
const dataValidationOf = require('../middlewares/dataValidationOf');
const checkIf = require('../middlewares/checkIf');
const isValid = require('../middlewares/isValid');

const router = express.Router();

router.get('/', ProductsController.getAll);
router.get('/:id', isValid.productId, ProductsController.getById);

router.post('/',
  dataValidationOf.productCreation,
  checkIf.productExists,
  ProductsController.create);

module.exports = router;
