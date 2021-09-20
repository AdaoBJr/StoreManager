const { StatusCodes } = require('http-status-codes');
const services = require('../3services/products');

const getAll = async (_req, res) => {
  try {
    const products = await services.getAll();

    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(error);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await services.getById(id);

    res.status(StatusCodes.OK).json(product);
  } catch (error) {
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(error);
  }
};

const create = async (req, res) => {
  try {
    const product = req.body;

    const newProduct = await services.create(product);

    res.status(StatusCodes.OK).json(newProduct);
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await services.create(id);

    res.status(StatusCodes.OK).json(updatedProduct);
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(error);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await services.remove(id);

    res.status(StatusCodes.OK).json(deletedProduct);
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(error);
  }
};

module.exports = { getAll, getById, create, update, remove };