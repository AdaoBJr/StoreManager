const { StatusCodes } = require('http-status-codes');
const salesService = require('../services/salesService');

//* Cria Sales
const createSales = async (req, res) => {
  try {
    const sales = req.body;
    const result = await salesService.createSales(sales);

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong Product ID or invalid quantity',
      },
    });
  }
};

//* Retorna todas as sales
const getAllSales = async (req, res) => {
  try {
    const sales = await salesService.getSales();
    return res.status(StatusCodes.OK).json({ sales });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Ops, algo de errado :( ' });
  }
};

//* Retorna uma sale por ID
const getSalesById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getSalesById(id);
    return res.status(StatusCodes.OK).json(sale);
  } catch (error) {
    return res.status(StatusCodes.NOT_FOUND).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
};

//* Atualiza uma sale por ID
const updateSale = async (req, res) => {
  try {
    const sale = req.body;
    const { id } = req.params;

    const result = await salesService.updateSale(sale, id);

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
};

//* Deleta uma sale por ID
const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await salesService.deleteSale(id);

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  }
};

module.exports = {
  getAllSales,
  getSalesById,
  createSales,
  updateSale,
  deleteSale,
};
