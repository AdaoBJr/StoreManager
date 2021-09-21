const ProductsService = require('../services/products');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const { id: _id } = await ProductsService.create({ name, quantity });

  return res.status(201).json({ _id, name, quantity });
};

const getAllProducts = async (req, res) => {
  const { products } = await ProductsService.getAll();

  return res.status(200).json({ products });
};

const findByIDProducts = async (req, res) => {
  const { id } = req.params;

  const { product } = await ProductsService
   .findById({ id });

  return res.status(200).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  await ProductsService
   .update({ id, name, quantity });

  return res.status(200).json({ id, name, quantity });
};

const deleteOneProduct = async (req, res) => {
  const { id } = req.params;

  const { product } = await ProductsService
   .deleteOneProduct({ id });

  return res.status(200).json(product);
};

module.exports = {
  createProduct,
  getAllProducts,
  findByIDProducts,
  updateProduct,
  deleteOneProduct,
};