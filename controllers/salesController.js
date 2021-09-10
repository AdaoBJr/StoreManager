const salesService = require('../services/salesService');

// ----------------------------------------------------------------------------------------------

// REQUISITO 5
const createSale = async (req, res) => {
  const sale = req.body;
  const { status, createdSale } = await salesService.createSale(sale);
  res.status(status).json(createdSale);
};

// -----------------------------------------------------------------------------------------------

module.exports = {
  createSale,
};