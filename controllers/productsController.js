const productsService = require('../services/productsService');
const productsModel = require('../models/productsModel');

const registerNewProduct = async (req, res) => {
  const newProduct = req.body;
  const newRegister = await productsService.registerNewProduct(newProduct);
  if (newRegister.err) {
    return res.status(422).json(newRegister);
  }
  res.status(201).json(newRegister);
};

const getProducts = async (_req, res) => {
  const products = await productsModel.getProducts();
  if (products.err) {
    return res.status(422).json(products);
  }
  res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productsModel.getProductById(id);
  if (product.err) {
    return res.status(422).json(product);
  }
  res.status(200).json(product);
};

module.exports = {
  registerNewProduct,
  getProducts,
  getProductById,
};
