const express = require('express');

const SalesController = require('../controllers/SalesController');
const dataValidationOf = require('../middlewares/dataValidationOf');
// const checkIf = require('../middlewares/checkIf');
const isValid = require('../middlewares/isValid');

const router = express.Router();

router.get('/', SalesController.getAll);
router.post('/', dataValidationOf.saleCreationOrUpdate, SalesController.create);

router.get('/:id', isValid.salesIdFromParams, SalesController.getById);
router.put('/:id', dataValidationOf.saleCreationOrUpdate, SalesController.update);

module.exports = router;