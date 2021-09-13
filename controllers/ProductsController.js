const PrductsService = require('../service/ProductsService');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await PrductsService.createProduct(name, quantity);
  res.status(200).json(newProduct);
};

module.exports = {
  createProduct,
};