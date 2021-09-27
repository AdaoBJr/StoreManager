const express = require('express');

const SalesController = require('../controllers/SalesController');
const dataValidationOf = require('../middlewares/dataValidationOf');
// const checkIf = require('../middlewares/checkIf');
// const isValid = require('../middlewares/isValid');

const router = express.Router();

router.get('/', SalesController.getAll);
router.post('/', dataValidationOf.saleCreation, SalesController.create);

router.get('/:id', SalesController.getById);

module.exports = router;