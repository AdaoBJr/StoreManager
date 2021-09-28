const express = require('express');

const SalesController = require('../controllers/SalesController');
const dataValidationOf = require('../middlewares/dataValidationOf');
// const checkIf = require('../middlewares/checkIf');
const isValidId = require('../middlewares/isValidId');

const router = express.Router();

router.get('/', SalesController.getAll);
router.post('/', dataValidationOf.saleCreationOrUpdate, SalesController.create);

router.get('/:id', isValidId.fromSalesPutRequestParams, SalesController.getById);
router.put('/:id',
  isValidId.fromSalesPutRequestParams,
  dataValidationOf.saleCreationOrUpdate,
  SalesController.update);
router.delete('/:id', isValidId.fromSalesDeleteRequestParams, SalesController.obliterate);

module.exports = router;