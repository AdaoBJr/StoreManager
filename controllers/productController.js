const { StatusCodes } = require('http-status-codes');
const productService = require('../services/productService');

const getAll = async (_req, res) => {
  try {
    const products = await productService.getAllService();
    return res.status(StatusCodes.OK).json({ products });
  } catch (error) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
      .send('Sorry! There is something wrong!');
  }
};

const create = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const createProduct = await productService.createService({ name, quantity });
    console.log(createProduct);
    return res.status(StatusCodes.CREATED).json(createProduct);
  } catch (error) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
      .send('Sorry! There is something wrong!');
  }
};

// const update = async (req, res) => {};
// const remove = async (req, res) => {};

module.exports = {
  create,
  getAll,
  // update,
  // remove,
};
