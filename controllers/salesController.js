const { StatusCodes: {
  OK,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
  NOT_FOUND,
 } } = require('http-status-codes');
const { include, getAll, getById, update, remove } = require('../services/salesService');

const INTERNAL_SERVER_ERROR_MSG = 'Something went wrong :(';

const addSales = async (req, res) => {
  try {
    const result = await include(req.body);

    if (result.stockError) return res.status(NOT_FOUND).json(result.err);
    if (result.err) return res.status(UNPROCESSABLE_ENTITY).json(result);
    
    return res.status(OK).json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR_MSG);
  }
};

const getAllSales = async (_req, res) => {
  try {
    const result = await getAll();
    return res.status(OK).json({ sales: result });
  } catch (error) {
    console.log(error.message);
    return res.status(INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR_MSG);
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getById(id, req.method);

    if (result.err) return res.status(NOT_FOUND).json(result);
     
    return res.status(OK).json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR_MSG);
  }
};

const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await update(id, req.body);
     
    if (result.err) return res.status(UNPROCESSABLE_ENTITY).json(result);

    return res.status(OK).json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR_MSG);
  }
};

const removeSale = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await remove(id, req.method);
   
    if (result.err) return res.status(UNPROCESSABLE_ENTITY).json(result);

    return res.status(OK).json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR_MSG);
  }
};

module.exports = {
  addSales,
  getAllSales,
  getSaleById,
  updateSale,
  removeSale,
}; 