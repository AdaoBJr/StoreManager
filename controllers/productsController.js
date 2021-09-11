const { StatusCodes: { OK, CREATED, INTERNAL_SERVER_ERROR } } = require('http-status-codes');
const { getAll } = require('../models/productsModel');
const { create, getById, update, remove } = require('../services/productsService');

const INTERNAL_SERVER_ERROR_MSG = 'Something went wrong :(';

const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await create(name, quantity);
    
    return res.status(CREATED).json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR_MSG);
  }
};

const getAllProducts = async (_req, res) => {
  try {
    const result = await getAll();
    return res.status(OK).json({ products: result });
  } catch (error) {
    console.log(error.message);
    return res.status(INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR_MSG);
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getById(id);
     
    return res.status(OK).json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR_MSG);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const result = await update(id, name, quantity);
   
    return res.status(OK).json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR_MSG);
  }
};

const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await remove(id);
   
    return res.status(OK).json(result);
  } catch (error) {
    console.log(error.message);
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
