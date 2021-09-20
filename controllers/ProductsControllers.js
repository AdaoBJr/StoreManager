const { create } = require('../services/ProductServices');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await create({ name, quantity });
  return res.status(201).json(product);
};

module.exports = {
  createProduct,
};
