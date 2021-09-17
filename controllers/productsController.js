const productsService = require('../services/productsService');

const registerProducts = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productsService.registerProducts(name, quantity);

  if (newProduct.err) {
    return res.status(422).json(newProduct);
  }

  return res.status(201).json(newProduct);
};

const getAllProducts = async (_req, res) => {
  const allProducts = await productsService.getAllProducts();

  return res.status(200).json(allProducts);
};

module.exports = {
  registerProducts,
  getAllProducts,
};
