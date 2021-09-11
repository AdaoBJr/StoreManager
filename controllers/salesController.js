const { StatusCodes } = require('http-status-codes');
const { include, getAll, getById } = require('../services/salesService');

const INTERNAL_SERVER_ERROR_MSG = 'Something went wrong :(';

const addSales = async (req, res) => {
  try {
    const result = await include(req.body);
    
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR_MSG);
  }
};

const getAllSales = async (_req, res) => {
  try {
    const result = await getAll();
    return res.status(StatusCodes.OK).json({ sales: result });
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR_MSG);
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('********', id);
    const result = await getById(id);
     
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR_MSG);
  }
};

module.exports = {
  addSales,
  getAllSales,
  getSaleById,
}; 