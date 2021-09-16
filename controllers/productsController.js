const { StatusCodes } = require('http-status-codes');
const model = require('../models/productsModel');

const registerProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await model.registerProduct(name, quantity);
    return res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await model.getProducts();
    return res.status(StatusCodes.OK).json({ products });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await model.getProductById(id);

    return res.status(StatusCodes.OK).json(product);
  } catch (error) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await model.updateProduct(id, name, quantity);

    return res.status(StatusCodes.OK).json(product);
  } catch (error) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await model.deleteProduct(id);

    return res.status(StatusCodes.OK).json(product);
  } catch (error) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
};

module.exports = {
  registerProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
