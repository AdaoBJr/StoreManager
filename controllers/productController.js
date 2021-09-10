const productService = require('../services/productServices');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const responseObj = await productService.createProduct(name, quantity);

  if (responseObj.err) {
    return res.status(422).json(responseObj);
  }

  return res.status(201).json(responseObj);
};

module.exports = {
  createProduct,
};