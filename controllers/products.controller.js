const { createProduct } = require('../services/products.service');

const createNewProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await createProduct({ name, quantity });
  return res.status(201).json(newProduct);
};

module.exports = {
  createNewProduct,
};