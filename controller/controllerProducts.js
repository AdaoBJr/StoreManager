const ServiceProduct = require('../service/serviceProducts');

const findById = async (req, res) => {
  const { id } = req.params;

  const product = await ServiceProduct.findById(id);

  if (product.err) return res.status(422).json(product);
  return res.status(200).json(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const productDeleted = await ServiceProduct.findById(id);

  const deleteOne = await ServiceProduct.deleteProduct(id);

  if (deleteOne.err) return res.status(422).json(deleteOne);
  return res.status(200).json(productDeleted);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  
  const updateProduct = await ServiceProduct.update(id, name, quantity);

  if (updateProduct.err) return res.status(422).json(updateProduct);
  return res.status(200).json(updateProduct);
};

const getAll = async (_req, res) => {
  const products = await ServiceProduct.getAll();
  return res.status(200).json(products);
};

const create = async (req, res) => {  
  const { name, quantity } = req.body;
  
  const product = await ServiceProduct.create({ name, quantity });

  if (product.err) return res.status(422).json(product);
  return res.status(201).json(product.ops[0]);
};

module.exports = { create, getAll, findById, update, deleteProduct };
