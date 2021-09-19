const productService = require('../services/productService');

const unprocessableEntity = 422;
const created = 201;

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { _id, message, code } = await productService.createProductValidation(name, quantity);
  
  if (message) {
    return res.status(unprocessableEntity).json({ err: { message, code } });
  }
  return res.status(created).json({ _id, name, quantity });
};

module.exports = {
  createProduct,
};
