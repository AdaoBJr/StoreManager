const Product = require('../services/products.services');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { code, err, newProduct } = await Product.create({ name, quantity });
  if (err) return res.status(code).json({ err });
  return res.status(code).json(newProduct);
};
const getAll = async (_req, res) => {
  const { code, products } = await Product.getAll();
  return res.status(code).json({ products });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { code, err, product } = await Product.getProductById(id);
  if (err) return res.status(code).json({ err });
  return res.status(code).json(product);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { code, err, updatedProduct } = await Product.update(id, req.body);
  if (err) return res.status(code).json({ err });
  return res.status(code).json(updatedProduct);
};

const removeProduct = async (req, res) => {
  const { id } = req.params;
  const { code, err, product } = await Product.removeProduct(id);
  if (err) return res.status(code).json({ err });
  return res.status(code).json(product);
};
module.exports = { create, getAll, getProductById, update, removeProduct };
