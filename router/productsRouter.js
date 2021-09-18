const express = require('express');
const productsControler = require('../controller/productsController');

const router = express.Router();

router.get('/', productsControler.getAllProducts)
      .get('/:id', productsControler.getProductById)
      .post('/', productsControler.createProduct)
      .put('/:id', productsControler.updateProduct)
      .delete('/:id', productsControler.deleteProduct);

module.exports = router;
