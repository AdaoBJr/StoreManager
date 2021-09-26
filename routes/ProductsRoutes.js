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
  
router.get('/:id', isValid.productId, ProductsController.getById);
router.put('/:id', isValid.productId,
  dataValidationOf.productCreation,
  ProductsController.update);
router.delete('/:id', isValid.productId, ProductsController.obliterate);

module.exports = router;
