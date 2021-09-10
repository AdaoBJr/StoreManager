const { createProduct, getProducts, getProductPerId } = require('../services/products.service');

const createNewProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await createProduct({ name, quantity });
  return res.status(201).json(newProduct);
};

const getAllProducts = async (req, res) => {
  const allProducts = await getProducts();
  return res.status(200).json({ products: allProducts });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const products = await getProductPerId(id);
  if (products.status === 200) return res.status(200).json(products.product);
  return res.status(products.err).json(products.err);
};

module.exports = {
  createNewProduct,
  getAllProducts,
  getProductById,
};