const express = require('express');

const router = express.Router();
const prodController = require('../controllers/productsController');

router.post('/',
prodController.validateName,
prodController.validateQuantity,
prodController.validateExistance,
prodController.addNewProduct);

router.get('/', prodController.getAll);

router.get('/:id', prodController.getById);

router.put('/:id',
prodController.validateName,
prodController.validateQuantity,
prodController.updateProduct);

router.delete('/:id',
prodController.deleteIdProduct,
prodController.deleteProduct);

module.exports = router;
