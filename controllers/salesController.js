const { createSale,
  getAllSales,
  findSaleById,
  updateSale,
  removeSale } = require('../services/salesService');
const catchAsync = require('../utils/catchAsync');

const STATUS_SUCCESS = 200;
const NOT_FOUND = 404;

const create = catchAsync(async (req, res) => {
  const bodySales = req.body;

  const sales = await createSale(bodySales);

  if (sales.err) return res.status(NOT_FOUND).json(sales);
  res.status(STATUS_SUCCESS).json(sales);
});

const getAll = catchAsync(async (req, res) => {
  const sales = await getAllSales();
  res.status(STATUS_SUCCESS).json(sales);
});

const getById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const meth = req.method;

  const sales = await findSaleById(id, meth);
  res.status(STATUS_SUCCESS).json(sales);
});

const update = catchAsync(async (req, res) => {
  const { id } = req.params;
  const sales = await updateSale(id, req.body);
  return res.status(STATUS_SUCCESS).json(sales);
});

const remove = catchAsync(async (req, res) => {
  const { id } = req.params;
  const meth = req.method;
  const sale = await removeSale(id, meth);
  res.status(STATUS_SUCCESS).json(sale);
});

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
