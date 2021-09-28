const express = require('express');

const ProductsController = require('../controllers/ProductsController');
const dataValidationOf = require('../middlewares/dataValidationOf');
const checkIf = require('../middlewares/checkIf');
const isValidId = require('../middlewares/isValidId');

const router = express.Router();

router.get('/', ProductsController.getAll);
router.post('/', dataValidationOf.productCreation,
  checkIf.productExists,
  ProductsController.create);
  
router.get('/:id', isValidId.fromProductRequestParams, ProductsController.getById);
router.put('/:id', isValidId.fromProductRequestParams,
  dataValidationOf.productCreation,
  ProductsController.update);
router.delete('/:id', isValidId.fromProductRequestParams, ProductsController.obliterate);

module.exports = router;
