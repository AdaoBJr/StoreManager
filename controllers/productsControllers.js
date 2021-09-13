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
  const allProducts = { products: [...products] };
  return res.status(200).json(allProducts);
});

const getProductById = rescue(async (req, res) => {
  const { id } = req.params;
  const productId = await ProductService.getProductById(id);
  if (productId.err) return res.status(422).json(productId); 
  return res.status(200).json(productId);
});

const updateProductById = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const updateProduct = await ProductService.updateProductById(id, name, quantity);
  if (updateProduct.err) {
    return res.status(422).json(updateProduct);
   } 
   return res.status(200).json(updateProduct);
});

const deleteProductById = rescue(async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await ProductService.deleteProductById(id);
  if (deleteProduct.err) {
    return res.status(422).json(deleteProduct);
   } 
   return res.status(200).json(deleteProduct);
});

module.exports = { 
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById, 
  deleteProductById,
};