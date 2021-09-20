const express = require('express');
const verifyIdFormat = require('../midlewares/idFormat');

const {
nameValidation, 
quantityValidation,
verifyProductExistence,
} = require('../midlewares/index');

const { 
getAllProducts,
getProductById, 
createProduct, 
updateProduct, 
deleteProduct, 
} = require('../controller/productsController');

const router = express.Router();

router.get('/', getAllProducts)
      .get('/:id', verifyIdFormat, verifyProductExistence, getProductById)
      .post('/', nameValidation, quantityValidation, verifyProductExistence, createProduct)
      .put('/:id', nameValidation, quantityValidation, updateProduct)
      .delete('/:id', verifyIdFormat, verifyProductExistence, deleteProduct);

module.exports = router;
