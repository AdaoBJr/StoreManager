const service = require('../Services/products');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await service.createProduct(name, quantity);
  return res.status(201).json(result);
};

module.exports = {
  createProduct,
};
