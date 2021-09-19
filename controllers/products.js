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
  const { code, err, product } = await serviceProduct.getById(id);
  if (err) return res.status(code).json({ err });
  return res.status(code).json(product);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { code, err, updatedProduct } = await serviceProduct.update(id, req.body);
  if (err) return res.status(code).json({ err });
  return res.status(code).json(updatedProduct);
};

const exclude = async (req, res) => {
  const { id } = req.params;
  const { code, err, product } = await serviceProduct.exclude(id);
  if (err) return res.status(code).json({ err });
  return res.status(code).json(product);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};