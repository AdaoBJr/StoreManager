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
  return res.status(201).json({ name, quantity, _id: newProduct.insertedId });
};

const getProductById = async (_req, _res) => {

};

module.exports = {
  getAllProducts,
  addNewProduct,
  getProductById,
};
