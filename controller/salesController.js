const salesModel = require('../models/salesModel');
const salesService = require('../services/salesService');

const add = async (req, res) => {
  try {
    const itensSold = req.body;
    const sales = await salesService.add(itensSold);
    if (sales.err) {
    return res.status(422).json(sales);
    }
    return res.status(200).json(sales);
  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
};

const getAll = async (_req, res) => {
  try {
      const sales = await salesModel.getAll();
      return res.status(200).json(sales);
  } catch (error) {
      return res.status(422).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getById(id);
  return res.status(200).json(sale);
  } catch (error) {
    return res.status(404).json({ err:
      { code: 'not_found', message: 'Sale not found' } });
  }
};

const update = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const { id } = req.params;
    const updateSale = await salesService.update({ id, productId, quantity });
    if (updateSale.err) {
      return res.status(422).json(updateSale);
    }
  return res.status(200).json(updateSale);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteSale = await salesService.remove(id);
    if (deleteSale.err) {
      return res.status(422).json(deleteSale);
    }
    return res.status(200).json(deleteSale);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { add, getAll, getById, update, remove };
