const productService = require('../services/productService');

const create = async (req, res, next) => {
  const product = await productService.create(req.body);
  console.log(product);
  if (product.err) {
    return next(product.err);
  }
  if (product) {
    return res.status(201).json(product);
  }
};

module.exports = {
  create,
};