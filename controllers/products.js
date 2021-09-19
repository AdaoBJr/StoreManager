// const { ObjectId } = require('mongodb');
const productsModel = require('../models/products');
const productsServices = require('../services/products');

const getAll = async (_req, res) => {
  const allProducts = await productsModel.getAllProductsFromDB();
  res.status(200).json({ products: allProducts });
};

const addNewProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productsServices.addNewProduct({ name, quantity }); 
  if (newProduct.err) return res.status(422).json(newProduct);
  return res.status(201).json(newProduct);
};

module.exports = {
  getAll,
  addNewProduct,
};
