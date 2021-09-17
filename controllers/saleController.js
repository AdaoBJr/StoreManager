const { StatusCodes } = require('http-status-codes');
const saleService = require('../services/saleService');

const getAll = async (_req, res) => {
  try {
    const sales = await saleService.getAllService();
    return res.status(StatusCodes.OK).json({ sales });
  } catch (error) {
    console.log(error);
  }
};

const create = async (req, res) => {
  try {
    const itensSold = req.body;
    console.log(itensSold, 'controller');
    const createSale = await saleService.createService({ itensSold });
    return res.status(StatusCodes.OK).json(createSale);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAll,
  create,
};
