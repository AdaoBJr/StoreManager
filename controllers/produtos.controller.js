const { criar } = require('../services/produtos.service');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await criar({ name, quantity });
  return res.status(201).json(product);
};

module.exports = { createProduct };
