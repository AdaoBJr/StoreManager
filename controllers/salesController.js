const salesService = require('../services/salesService');

// ----------------------------------------------------------------------------------------------

// REQUISITO 5
const createSale = async (req, res) => {
  const sale = req.body;
  const { status, createdSale } = await salesService.createSale(sale);
  res.status(status).json(createdSale);
};

// REQUISITO 6
const getSales = async (req, res) => {
  const { id } = req.params;
  if (id) {
    const { status, sale } = await salesService.getSales(id);
    return res.status(status).json(sale);
  }
  const { status, sales } = await salesService.getSales();
  return res.status(status).json(sales);
};

// -----------------------------------------------------------------------------------------------

module.exports = {
  createSale,
  getSales,
};