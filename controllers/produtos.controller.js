const { criar, getAll, getById } = require('../services/produtos.service');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await criar({ name, quantity });
  return res.status(201).json(product);
};

const listAll = async (req, res) => {
  const products = await getAll();
  return res.status(200).json({ products });
};

const productById = async (req, res) => {
  const { id } = req.params;
  const products = await getById(id);
  if (products.status === 200) {
    return res.status(200).json(products.produto);
  }
  return res.status(products.status).json(products.err);
};

module.exports = { createProduct, listAll, productById };
