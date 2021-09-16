const SalesServices = require('../services/SalesServices');

const addSale = async (req, res, next) => {
  const sale = req.body;
  const result = await SalesServices.addSale(sale);
  if (result.status === 422 || result.status === 404) {
    return next(result);
  }
  return res.status(200).json(result);
};

const getSale = async (_req, res) => {
  const result = await SalesServices.getSale();
  return res.status(200).json(result);
};

const getSaleById = async (req, res, next) => {
  const { id } = req.params;
  const result = await SalesServices.getSaleById(id);
  if (result.status === 404) {
    return next(result);
  }
  return res.status(200).json(result);
};

const putSales = async (req, res, next) => {
  const { id } = req.params;
  const sale = req.body;
  const result = await SalesServices.putSales(id, sale);
  if (result.status === 422) {
    return next(result);
  }
  return res.status(200).json(result);
};

const deleteSales = async (req, res, next) => {
const { id } = req.params;
const result = await SalesServices.deleteSales(id);
if (!result) {
  return next({
    status: 422,
    code: 'invalid_data',
    message: 'Wrong sale ID format',
  });
}
return res.status(200).json(result);
};

module.exports = {
  addSale,
  getSale,
  getSaleById,
  putSales,
  deleteSales,
};