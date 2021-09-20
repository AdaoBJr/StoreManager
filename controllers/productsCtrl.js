const { StatusCodes: { OK, CREATED, INTERNAL_SERVER_ERROR } } = require('http-status-codes');
const { getProducts } = require('../models/productsMdl');
const { add, getById, update, remove } = require('../services/productSrvc');

const INTERNAL_SERVER_ERROR_MSG = 'BAD REQUEST';

const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const response = await add(name, quantity);
    
    return res.status(CREATED).json(response);
  } catch (error) {
    console.error(error.message);

    return res.status(INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR_MSG);
  }
};

const getAllProducts = async (_req, res) => {
  try {
    const response = await getProducts();

    return res.status(OK).json({ products: response });
  } catch (error) {
    console.error(error.message);

    return res.status(INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR_MSG);
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getById(id);
     
    return res.status(OK).json(response);
  } catch (error) {
    console.error(error.message);

    return res.status(INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR_MSG);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const response = await update(id, name, quantity);
   
    return res.status(OK).json(response);
  } catch (error) {
    console.error(error.message);

    return res.status(INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR_MSG);
  }
};

const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await remove(id);
   
    return res.status(OK).json(response);
  } catch (error) {
    console.error(error.message);

    return res.status(INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR_MSG);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  removeProduct,
};
