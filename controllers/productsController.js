const { createProducts } = require('../services/productsService');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await createProducts({ name, quantity });
  return res.status(201).json(product);
};

module.exports = {
  create,
};
