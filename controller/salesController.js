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
    const sales = req.body;
    const { id } = req.params;
    const updateSale = await salesService.update(id, sales);
    if (updateSale.err) {
      return res.status(422).json(updateSale);
    }
  return res.status(200).json(updateSale);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

  const remove = (req, res) => salesService.remove(req.params.id)
  .then((result) => {
    if (result.err) { return res.status(422).json(result); }
    return res.status(200).json(result);
  }).catch((error) => res.status(422).json({ message: error.message }));

module.exports = { add, getAll, getById, update, remove };
