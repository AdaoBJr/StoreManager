const StatusCodes = require('http-status-codes');
const saleService = require('../services/saleService');

// const ok = 200;
// const unprocessableEntity = 422;
// const notFound = 404;

// req 5
// Acertos na função feitos com a ajuda do colega Henrique Zózimo e Ivan Rafael
const registerSale = async (req, res) => {
  const sale = req.body;
  const register = await saleService.registerSaleValidation(sale);
  const { _id, code, message } = register;
  if (message) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ err: { code, message } });
  }
  return res.status(StatusCodes.OK).json({ _id, itensSold: [...req.body] });
};

// req 6
const findAllSales = async (req, res) => {
  const allSales = await saleService.findAllSalesValidation();
  return res.status(StatusCodes.OK).json({ sales: allSales });
};

// req 6
const findSaleById = async (req, res) => {
  const { id } = req.params;
  const saleById = await saleService.findSaleByIdValidation(id);
  const { code, message } = saleById;
  if (message) {
    return res.status(StatusCodes.NOT_FOUND).json({ err: { code, message } });
  }
  return res.status(StatusCodes.OK).json(saleById);
};

// req 7
const updateSale = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const updatedSale = await saleService.updateSaleValidation(id, body);
  const { code, message } = updatedSale;

  if (message) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ err: { code, message } });
  }
  return res.status(StatusCodes.OK).json(updatedSale);
};

// req 8
const deleteSale = async (req, res) => {
  const { id } = req.params;
  const deleted = await saleService.deleteSaleValidation(id);
  const { code, message } = deleted;
  if (message) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ err: { code, message } });
  }
  return res.status(StatusCodes.OK).json();
};

module.exports = {
  registerSale,
  findAllSales,
  findSaleById,
  updateSale,
  deleteSale,
};
