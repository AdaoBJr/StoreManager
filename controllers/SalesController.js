const service = require('../services/SalesServices');

const getAllSales = async (_req, res) => {
  const sales = await service.getAllSales();
  res.status(200).json(sales);
};

const findById = async (req, res) => {
  const { id } = req.body;
  const salesId = await service.findById(id);

  if (salesId.err) {
    return res.status(404).json({ err: salesId.err });
  }

  return res.status(200).json(salesId);
};

const createSales = async (req, res) => {
  const arr = req.body;
  const addSales = await service.createSales(arr);

  if (addSales.err) {
    return res.status(422).json({ err: addSales.err });
  }
  
  res.status(200).json(addSales);
};

const updateSales = async (req, res) => {
  const { id } = req.params;
  const arr = req.body;

  const saleUpdate = await service.updateSales(id, arr);

  if (saleUpdate.err) {
    return res.status(422).json({ err: saleUpdate.err });
  }

  res.status(200).json(saleUpdate);
};

module.exports = {
  createSales,
  getAllSales,
  findById,
  updateSales,
};