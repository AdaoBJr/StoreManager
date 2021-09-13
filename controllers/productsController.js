const productsService = require('../services/productsService');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  
  const product = await productsService.createProduct(name, quantity);
  if (product.error) return res.status(422).json(product);
  return res.status(201).json(product);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await productsService.updateProduct(id, name, quantity);
  if (product.error) return res.status(422).json(product);
  return res.status(200).json(product);
};

const getAll = async (_req, res) => {
  const products = await productsService.findAllProducts();
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.findId(id);

  if (product.error) return res.status(422).json({ err: product.err });
  res.status(200).json(product);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};