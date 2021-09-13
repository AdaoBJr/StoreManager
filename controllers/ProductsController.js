const rescue = require('express-rescue');
const Joi = require('joi');
const PrductsService = require('../service/ProductsService');

const createProduct = rescue(async (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().integer().min(1).required(),
  }).validate(req.body);
  if (error) {
    return next(error);
  }

  const { name, quantity } = req.body;
  const newProduct = await PrductsService.createProduct(name, quantity);
  if (newProduct.err) return next(newProduct.err);
  res.status(201).json(newProduct);
});

const getAllProducts = rescue(async (_req, res, next) => {
const allProducts = await PrductsService.getAll();
if (allProducts.err) return next(allProducts.err);
  res.status(200).json({ products: allProducts });
});

const getProductById = rescue(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const findProduct = await PrductsService.getProductById(id);
if (findProduct.err) return next(findProduct.err);

  res.status(200).json(findProduct);
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};