const ProductService = require('../services/ProductService');

const OK_STATUS = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await ProductService.create(name, quantity);
  const { id } = product;

  if (product.err) { 
    return res.status(UNPROCESSABLE_ENTITY)
    .json(product); 
}
  return res.status(CREATED).json({ _id: id, name: product.name, quantity: product.quantity });
};

const getAll = async (_req, res) => {
  const products = await ProductService.getAll();
  res.status(OK_STATUS).json(products);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const product = await ProductService.findById(id);

  if (product.err) {
    return res.status(UNPROCESSABLE_ENTITY).json(product);
  }
  res.status(OK_STATUS).json(product);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const product = await ProductService.update(id, name, quantity);

  if (product.err) return res.status(UNPROCESSABLE_ENTITY).json(product);

  return res.status(200).json(product);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const product = await ProductService.deleteById(id);

  if (product.err) return res.status(UNPROCESSABLE_ENTITY).json(product);

  return res.status(200).json(product);
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  deleteById,
}; 