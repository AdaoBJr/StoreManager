const Sales = require('../services/Sales');

const SaleExistenceValidation = async (req, res, next) => {
  const { id } = req.params;
  const saleNotFound = await Sales.saleExists(id);

  if (saleNotFound.err) {
    return res.status(404).json(saleNotFound);
  }
  next();
};

const quantityValidation = (req, res, next) => {
  const checkQuantity = Sales.quantityValidation(req.body);

  if (checkQuantity.err) {
    return res.status(422).json(checkQuantity);
  }
  next();
};

const getAllSales = async (_req, res) => {
  const sales = await Sales.getAllSales();

  res.status(200).json({ sales });
};

const findSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await Sales.findSaleById(id);
  res.status(200).json(sale);
};

const createSale = async (req, res) => {
  const newSale = await Sales.createSale(req.body);

  res.status(200).json(newSale);
};

module.exports = {
  getAllSales,
  findSaleById,
  createSale,
  quantityValidation,
  SaleExistenceValidation,
};
