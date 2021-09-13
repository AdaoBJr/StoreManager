const StatusCodes = require('http-status-codes');
const ProductService = require('../services/ProductService');
const ProductModel = require('../models/ProductModel');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const { id, code, message } = await ProductService.create(name, quantity);

  if (message) { 
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
    .json({ err: { code, message } }); 
}
  res.status(code).json({ _id: id, name, quantity });
};

const getAll = async (req, res) => {
    const allProducts = await ProductModel.getAll();

  if (!allProducts) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
    .json({ err: { code: 422, message: 'It was not possible to return the products' } });
  }

  res.status(StatusCodes.OK).json({ products: allProducts });
};

const findById = async (req, res) => {
  const { id } = req.params;

  const { code, message, name, quantity } = await ProductService.findById(id);

  if (message) { 
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
    .json({ err: { code, message } }); 
}
  res.status(StatusCodes.OK).json({ _id: id, name, quantity });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const { code, message } = await ProductService.updateProduct(id, name, quantity);

  if (message) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
    .json({ err: { code, message } });
  }

  res.status(StatusCodes.OK).json({ _id: id, name, quantity });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const { code, message } = await ProductService.deleteProduct(id);

  if (message) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
    .json({ err: { code, message } });
  }

  res.status(StatusCodes.OK).json({ _id: id, name, quantity });
};

module.exports = { 
  create,
  getAll,
  findById,
  updateProduct,
  deleteProduct,
 };
