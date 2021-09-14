const { ObjectId } = require('mongodb');
const { create, getAll, IdSales, update } = require('../services/salesServices');

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

const updateSale = async (req, res) => {
  const { id } = req.params;

  await update({ id, productId: req.body[0].productId, quantity: req.body[0].quantity });
  return res.status(200).json({
    _id: id, itensSold: [{ productId: req.body[0].productId, quantity: req.body[0].quantity }] });
};

module.exports = { createSales, allSales, soldById, updateSale };
