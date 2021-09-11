const { StatusCodes } = require('http-status-codes');
const { getAll } = require('../models/productsModel');
const { create, getById, update } = require('../services/productsService');

const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await create(name, quantity);
    
    return res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong :(');
  }
};

const getAllProducts = async (_req, res) => {
  try {
    const result = await getAll();
    return res.status(StatusCodes.OK).json({ products: result });
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong :(');
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getById(id);
     
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong :(');
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const result = await update(id, name, quantity);
   
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong :(');
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
};
