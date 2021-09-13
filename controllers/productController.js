// const Joi = require('joi');

const productService = require('../services/productServices');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const responseObj = await productService.createProduct(name, quantity);
  const { id } = responseObj;
  
  if (responseObj.err) {
    return res.status(422).json(responseObj);
  }
  return res.status(201).json({ _id: id, name: responseObj.name, quantity: responseObj.quantity });
};

const getAll = async (_req, res) => {
  const allProducts = await productService.getAll();
  return res.status(200).json(allProducts);
  // if (allProducts.message) {
  //   return res.status(Boom.notFound.statusCode).json(Boom.notFound(allProducts.message));
  // }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const oneProduct = await productService.getProductById(id);
  if (oneProduct.err) return res.status(422).json(oneProduct);
  res.status(200).json(oneProduct);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const updatedProduct = await productService.updateProduct(id, name, quantity);

  if (updatedProduct.err) { return res.status(422).json(updatedProduct); }
  return res.status(200).json(updatedProduct);
};

module.exports = {
  createProduct,
  getAll,
  getProductById,
  updateProduct,
};