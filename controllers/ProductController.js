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

// Router.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, quantity } = req.body;
  
//   await ProductService.update(id, name, quantity);

//   res.status(StatusCodes.NO_CONTENT).end();

module.exports = { 
  create,
  getAll,
  findById,
 };
