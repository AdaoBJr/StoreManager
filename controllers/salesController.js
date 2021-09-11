const { StatusCodes } = require('http-status-codes');
const { include } = require('../services/salesService');

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

module.exports = {
  addSales,
}; 