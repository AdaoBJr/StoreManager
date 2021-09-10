const { StatusCodes } = require('http-status-codes');
const productService = require('../services/productService');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productService.create(name, quantity);
  if (newProduct.message) {
    return res.status(newProduct.code)
    .json({
        err: {
          code: 'invalid_data',
          message: newProduct.message,
        },
      });
  }
  return res.status(StatusCodes.CREATED).json(newProduct);
};
// const getAll = async (req, res) => {};
// const update = async (req, res) => {};
// const remove = async (req, res) => {};

module.exports = {
  create,
  // getAll,
  // update,
  // remove,
};
