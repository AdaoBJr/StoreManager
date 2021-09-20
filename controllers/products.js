// const { ObjectId } = require('mongodb');
const productsModel = require('../models/products');
const productsServices = require('../services/products');

const getAllProducts = async (_req, res) => {
  const allProducts = await productsModel.getAllProductsFromDB();
  res.status(200).json({ products: allProducts });
};

const addNewProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productsServices.addNewProduct({ name, quantity });
  if (newProduct.wasAnError) return res.status(422).json(newProduct);
  console.log(newProduct.insertedId);
  return res.status(201).json({ name, quantity, _id: newProduct.insertedId });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productsServices.getProductById(id);
  if (product.wasAnError) return res.status(422).json(product);
  return res.status(200).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const updatedProduct = await productsServices.updateProductById(id, { name, quantity });
  if (updatedProduct.wasAnError) return res.status(422).json(updatedProduct);
  return res.status(200).json({ name, quantity, _id: id });
};

module.exports = {
  getAllProducts,
  addNewProduct,
  getProductById,
  updateProduct,
};
