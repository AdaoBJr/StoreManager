const rescue = require('express-rescue');
const ProductService = require('../services/productsService');

const createProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const Obj = await ProductService.createProduct(name, quantity);
  if (Obj.err) {
   return res.status(422).json(Obj);
  } 
  return res.status(201).json(Obj.product);
});

const getAllProducts = rescue(async (_req, res) => {
  const products = await ProductService.getAllProducts();
  return res.status(200).json(products);
});

const getProductById = rescue(async (req, res) => {
  const { id } = req.params;
  const productId = await ProductService.getProductById(id);

  if (productId.err) return res.status(422).json(productId); 
  return res.status(200).json(productId);
});

module.exports = { 
  createProduct,
  getAllProducts,
  getProductById, 
};