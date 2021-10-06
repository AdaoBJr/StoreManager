const Service = require('../services');

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_UNPROCESSABLE = 422;
const STATUS_NOT_FOUND = 404;

const storeSales = async (req, res) => {
  const sales = await Service.sales.storeSales(req.body);

  if (sales.err) return res.status(STATUS_UNPROCESSABLE).json(sales);

  res.status(STATUS_CREATED).json(sales);
};

const getAllSales = async (_req, res) => {
  const sales = await Service.sales.getAllSales();

  res.status(STATUS_OK).json(sales);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;

  const sale = await Service.sales.getSalesById(id);

  if (sale.err) return res.status(STATUS_NOT_FOUND).json(sale);

  res.status(STATUS_OK).json(sale);
};

const updatedSale = async (req, res) => {
  const { id } = req.params;

  const sale = await Service.sales.updatedSale(id, req.body);

  if (sale.err) return res.status(STATUS_UNPROCESSABLE).json(sale);

  res.status(STATUS_OK).json(sale);
};

module.exports = {
  storeSales,
  getAllSales,
  getSalesById,
  updatedSale,
};