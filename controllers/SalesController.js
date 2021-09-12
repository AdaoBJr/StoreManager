const SalesService = require('../services/SalesService');

const getAllSales = async (req, res) => {
  const listSales = await SalesService.getAll();

  res.status(200).json({ sales: listSales });
};

const findSalesById = async (req, res) => {
  const { id } = req.params;

  const salesById = await SalesService.findById(id);

  if (salesById.err) {
    return res.status(404).json({ err: salesById.err });
  }

  res.status(200).json(salesById);
};

const createSales = async (req, res) => {
  const arrSales = req.body;

  const salesCreated = await SalesService.create(arrSales);

  if (salesCreated.err) {
    return res.status(422).json({ err: salesCreated.err });
  }

  res.status(200).json(salesCreated);
};

module.exports = {
  getAllSales,
  findSalesById,
  createSales,
};