const express = require('express');

const router = express.Router();
const productsController = require('../controllers/productsController');

router.post('/',
productsController.validName,
productsController.validQuantity,
productsController.verifyExistance,
productsController.addNewProduct);

router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

router.put('/:id',
productsController.validName,
productsController.validQuantity,
 productsController.editProduct);

module.exports = router;