const { ObjectId } = require('mongodb');
const { create, getAll, IdSales } = require('../services/salesServices');

const createSales = async (req, res) => {
  const sale = req.body;

  const sales = await create(sale);
  const { _id } = sales;
  if (!_id) {
    return res.status(404).json(sales);
  }
  return res.status(200).json(sales);
};

const allSales = async (req, res) => {
  const sales = await getAll();
  return res.status(200).json({ sales });
};

const soldById = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({
      err: { code: 'not_found', message: 'Sale not found' },
    });
  }
  const sales = await IdSales(id);
  if (sales.status === 404) {
    const { err } = sales;
    return res.status(sales.status).json({ err });
  }
  return res.status(sales.status).json(sales.sold);
};

module.exports = { createSales, allSales, soldById };
