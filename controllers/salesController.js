const salesService = require('../services/salesService');

const registerSales = async (req, res) => {
  const itemSold = req.body;
  const newSales = await salesService.registerSales(itemSold);

  if (newSales.err) {
    return res.status(422).json(newSales);
  }

  return res.status(200).json(newSales);
};

const getAllSales = async (req, res) => {
  const listAllSales = await salesService.getAllSales();

  return res.status(200).json(listAllSales);
};

const getSalesId = async (req, res) => {
  const { id } = req.params;
  const salesId = await salesService.getSalesId(id);

  if (salesId.err) {
    return res.status(404).json(salesId);
  }

  return res.status(200).json(salesId);
};

module.exports = {
  registerSales,
  getAllSales,
  getSalesId,
};
