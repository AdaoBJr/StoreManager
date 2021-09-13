const { create, getAll, getById, update } = require('../services/productService');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await create({ name, quantity });
  return res.status(201).json(product);
};

const allProducts = async (req, res) => {
  const products = await getAll();
  return res.status(200).json({ products });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const products = await getById(id);
  if (products.status === 200) {
    return res.status(200).json(products.product);
  }
  return res.status(products.status).json(products.err);
};

const updatedSucessfully = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  await update({ id, name, quantity });
  return res.status(200).json({ id, name, quantity });
};

module.exports = { createProduct, allProducts, getProductById, updatedSucessfully };
