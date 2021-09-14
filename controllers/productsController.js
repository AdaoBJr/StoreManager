const productsService = require('../services/productsService');
const productsModel = require('../models/productsModel');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productsService.createProduct(name, quantity);
  if (product.err) return res.status(422).json(product);
  return res.status(201).json(product);
};

const getAllProducts = async (req, res) => {
  const products = await productsModel.getAllProducts();
  if (products.err) {
    return res.status(422).json(products);
  }
  return res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.verifyExistenceId(id);
  if (product.err) {
    return res.status(422).json(product);
  }
  return res.status(200).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const product = await productsService.updateProduct(name, quantity, id);
  if (product.err) {
    return res.status(422).json(product);
  }
  return res.status(200).json(product);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
};