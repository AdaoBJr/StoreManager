const express = require('express');

const SalesController = require('../controllers/SalesController');
const dataValidationOf = require('../middlewares/dataValidationOf');
const checkIf = require('../middlewares/checkIf');
const isValid = require('../middlewares/isValid');

const router = express.Router();

router.post('/', isValid.productIdFromBody,
  dataValidationOf.saleCreation,
  SalesController.create);

module.exports = router;