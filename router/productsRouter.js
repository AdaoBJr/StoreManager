const express = require('express');
const { 
getAllProducts,
getProductById, 
createProduct, 
updateProduct, 
deleteProduct, 
} = require('../controller/productsController');

const router = express.Router();

router.get('/', getAllProducts)
      .get('/:id', getProductById)
      .post('/', createProduct)
      .put('/:id', updateProduct)
      .delete('/:id', deleteProduct);

module.exports = router;
