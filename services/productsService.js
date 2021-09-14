const productsModel = require('../models/productsModel');

const createProduct = async (name, quantity) => productsModel.createProduct(name, quantity);

const getAllProducts = async () => productsModel.getAllProducts();

const getProductById = async (id) => productsModel.getProductById(id);

const updateProductById = async (id, name, quantity) => 
  productsModel.updateProductById(id, name, quantity);

const deleteProductById = async (id) => productsModel.deleteProductById(id);

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};