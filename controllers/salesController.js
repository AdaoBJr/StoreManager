const salesService = require('../services/salesService');

const createSale = async (req, res) => {
  const itensSold = req.body;

  const { id: _id } = await salesService.create({ itensSold });
  
  return res.status(200).json({ _id, itensSold });
};

const getAllSales = async (req, res) => {
  const { sales } = await salesService.getAll();
  
  return res.status(200).json({ sales });
};

const findByIdSale = async (req, res) => {
  const { id } = req.params;
  
  const { sale } = await salesService
   .findById({ id });

  return res.status(200).json(sale);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;
  
  await salesService
   .update({ id, itensSold });

  return res.status(200).json({ _id: id, itensSold });
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  
  const { sale } = await salesService
   .deleteSale({ id });

  return res.status(200).json(sale);
};

module.exports = {
  createSale,
  getAllSales,
  findByIdSale,
  updateSale,
  deleteSale,
};