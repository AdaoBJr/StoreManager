const express = require('express');

const ProductsController = require('../controllers/ProductsController');
const dataValidationOf = require('../middlewares/dataValidationOf');
const checkIf = require('../middlewares/checkIf');
const isValid = require('../middlewares/isValid');

const router = express.Router();

router.get('/', ProductsController.getAll);
router.post('/', dataValidationOf.productCreation,
  checkIf.productExists,
  ProductsController.create);
  
router.get('/:id', isValid.productIdFromParams, ProductsController.getById);
router.put('/:id', isValid.productIdFromParams,
  dataValidationOf.productCreation,
  ProductsController.update);
router.delete('/:id', isValid.productIdFromParams, ProductsController.obliterate);

module.exports = router;
