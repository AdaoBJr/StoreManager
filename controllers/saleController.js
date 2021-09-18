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

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const saleId = await saleService.getByIdService(id);
    if (saleId === false) {
      return res.status(StatusCodes.NOT_FOUND).json({ 
        err: { 
          code: 'not_found',
          message: 'Sale not found',
        },
      });
    }
    return res.status(StatusCodes.OK).json(saleId);
  } catch (error) {
    console.log(error);
  }
};

const create = async (req, res) => {
  try {
    const itensSold = req.body;
    const createSale = await saleService.createService({ itensSold });
    return res.status(StatusCodes.OK).json(createSale);
  } catch (error) {
    console.log(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = req.body;
    const updatedSale = await saleService.updateService(id, sale);
    return res.status(StatusCodes.OK).json(updatedSale);
  } catch (error) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
      .send('Sorry! There is something wrong!');
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
