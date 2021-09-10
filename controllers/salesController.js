const { createSale,
  getAllSales,
  findSaleById,
  updateSale,
  removeSale } = require('../services/salesService');

const STATUS_SUCCESS = 200;
const NOT_FOUND = 404;

const getAll = async (req, res) => {
  const sales = await getAllSales();
  res.status(STATUS_SUCCESS).json(sales);
};
