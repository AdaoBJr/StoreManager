const { criar, getAll, getById, update } = require('../services/vendas.service');

const createSales = async (req, res) => {
  const result = req.body;

  const sales = await criar(result);
  return res.status(200).json(sales);
};

const listAll = async (req, res) => {
  const sales = await getAll();
  return res.status(200).json({ sales });
};

const saleById = async (req, res) => {
  const { id } = req.params;
  const sales = await getById(id);
  if (sales.status === 200) {
    return res.status(200).json(sales.venda);
  }
  return res.status(sales.status).json(sales.err);
};

const updateSale = async (req, res) => {
  const { productId, quantity } = req.body;
  const { id } = req.params;

  await update({ id, productId, quantity });
  return res.status(200).json({ id, productId, quantity });
};

module.exports = { createSales, listAll, saleById, updateSale };
