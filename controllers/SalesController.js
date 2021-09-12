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

const updateSales = async (req, res) => {
  const { id } = req.params;
  const arrSales = req.body;

  const salesUpdate = await SalesService.update(id, arrSales);

  if (salesUpdate.err) {
    return res.status(422).json({ err: salesUpdate.err });
  }

  res.status(200).json(salesUpdate);
};

const excludeSales = async (req, res) => {
  const { id } = req.params;

  const salesExclude = await SalesService.exclude(id);

  if (salesExclude.err) {
    return res.status(422).json({ err: salesExclude.err });
  }

  res.status(200).json({ message: 'excluded product' });
};

module.exports = {
  getAllSales,
  findSalesById,
  createSales,
  updateSales,
  excludeSales,
};