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
  const product = await productsService.getProductById(id);
  if (product.err) {
    return res.status(422).json(product);
  }
  res.status(200).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const product = await productsService.getProductById(id);
  if (product.err) {
    return res.status(422).json(product);
  }
  const updatedProduct = await productsService.updateProduct({ id, name, quantity });
  if (updatedProduct.err) {
    console.log(updatedProduct);
    return res.status(422).json(updatedProduct);
  }
  res.status(200).json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getProductById(id);
  if (product.err) {
    return res.status(422).json(product);
  }
  await productsModel.deleteProduct(id);
  res.status(200).json(product);
};

module.exports = {
  registerNewProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
