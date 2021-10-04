const express = require('express');
const router = express.Router();
const productService = require('../services/productService');

const CREATED_STATUS = 201;
const UNPROCESSABLE_ENTITY_STATUS = 422;

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productService.validateProduct({ name, quantity });

  if(newProduct.isJoi) {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).send({ err:
      { code: 'invalid_data',
        message: newProduct.details[0].message } });
  } else if (newProduct.err) {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).send(newProduct);
  }
  res.status(CREATED_STATUS).json(newProduct);
});

module.exports = router;
