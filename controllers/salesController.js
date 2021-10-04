const express = require('express');

const router = express.Router();
const salesServices = require('../services/salesServies');

const OK_STATUS = 200;
const UNPROCESSABLE_ENTITY_STATUS = 422;

router.post('/', async (req, res) => {
  const products = req.body;
  const validatedProducts = await salesServices.validateProducts(products);
  if (validatedProducts.isJoi) {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).send({ err:
      { code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity' } });
  }
  return res.status(OK_STATUS).send(validatedProducts);
});

module.exports = router;
