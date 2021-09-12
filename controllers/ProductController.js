const ProductService = require('../services/ProductService');
const ProductModel = require('../models/ProductModel');

const OK_STATUS = 200;
const UNPROCESSABLE_ENTITY = 422;

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const { id, code, message } = await ProductService.create(name, quantity);

  if (message) { 
    return res.status(UNPROCESSABLE_ENTITY)
    .json({ err: { code, message } }); 
}
  return res.status(code).json({ _id: id, name, quantity });
};

const getAll = async (_req, res) => {
  const products = await ProductModel.getAll();

  if (!products) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 422,
        message: 'It was not possible to return the products',
      },
    });
  }

  res.status(OK_STATUS)
    .json({ products });
};

const findById = async (req, res) => {
  const { id } = req.params;

  const { code, message, name, quantity } = await ProductService.findById(id);

  if (message) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code,
        message,
      },
    });
  }
  res.status(OK_STATUS)
    .json({
      _id: id,
      name,
      quantity, 
    });
};

module.exports = {
  create,
  getAll,
  findById,
}; 