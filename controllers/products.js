const serviceProduct = require('../services/products');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { code, err, newProduct } = await serviceProduct.create({ name, quantity });
  if (err) return res.status(code).json({ err });
  return res.status(code).json(newProduct);
};

const getAll = async (_req, res) => {
  const { code, products } = await serviceProduct.getAll();
  return res.status(code).json({ products });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { code, err, product } = await serviceProduct.getProductById(id);
  if (err) return res.status(code).json({ err });
  return res.status(code).json(product);
};
module.exports = { create, getAll, getById };