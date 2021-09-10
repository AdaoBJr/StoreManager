const { createSale,
  getAllSales,
  findSaleById,
  updateSale,
  removeSale } = require('../services/salesService');

const STATUS_SUCCESS = 200;
const NOT_FOUND = 404;

const create = async (req, res) => {
  const bodySales = req.body;

  const sales = await createSale(bodySales);

  if (sales.err) return res.status(NOT_FOUND).json(sales);
  res.status(STATUS_SUCCESS).json(sales);
};

const getAll = async (req, res) => {
  const sales = await getAllSales();
  res.status(STATUS_SUCCESS).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const sales = await findSaleById(id);
  res.status(STATUS_SUCCESS).json(sales);
};
