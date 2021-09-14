const productService = require('../services/productService');
const productModel = require('../models/productModel');

const create = async (req, res, next) => {
  const product = await productService.createProduct(req.body);
  if (product.err) {
    return next(product.err);
  }
  if (product) {
    return res.status(201).json(product);
  }
};

const getAllProduct = async (_req, res) => {
  const products = await productModel.getAllProduct();
  return res.status(200).json({ products });
};

const getByIdProduct = async (req, res, next) => {
  const { id } = req.params;
  const product = await productService.getByIdProduct(id);
  if (product.err) {
    return next(product.err);
  }
  return res.status(200).json(product);
};

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const product = await productService.updateById(id, req.body);
  if (product.err) {
    return next(product.err);
  }
  if (product) {
    return res.status(200).json({ _id: id, ...product });
  }
};

const deleteId = async (req, res, next) => {
  const { id } = req.params;
  const product = await productService.deleteId(id);
  if (product.err) {
    return next(product.err);
  }
  if (product) {
    return res.status(200).json(product);
  }
  return res.status(200).send(product);
};

module.exports = {
  create,
  getAllProduct,
  deleteId,
  updateById,
  getByIdProduct,
};