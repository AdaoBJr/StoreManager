const salesModel = require('../models/salesModel');
const service = require('../services/salesService');

const getAllSales = async (_req, res) => {
  try {
      const sales = await salesModel.getAll();
      return res.status(200).json(sales);
  } catch (error) {
      return res.status(422).json({ message: error.message });
  }
};

const getSaleById = async (req, res) => {
  try {
      const { id } = req.params;
      const result = await service.getSaleById(id);

      if (result.err) {
          return res.status(422).json(result);
      }
      return res.status(200).json(result);
  } catch (error) {
      return res.status(422).json({ message: error.message });
  }
};

const createSale = async (req, res) => {
  try {
      const itensSold = req.body;
      const result = await service.createSale(itensSold);
      if (result.err) { 
        return res.status(422).json(result); 
      }

      return res.status(200).json(result);
  } catch (error) {
      return res.status(422).json({ message: error.message });
  }
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
};