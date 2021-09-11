const { criar, getAll, getById, update, removeSale } = require('../services/vendas.service');

const createSales = async (req, res) => {
  const result = req.body;

  const sales = await criar(result);
  return res.status(200).json(sales);
};

const listAll = async (req, res) => {
  const sales = await getAll();
  return res.status(200).json({ sales });
};

const deleteSale = async (req, res) => {
  const result = await removeSale({ _id: req.params.id });
  if (result.err) {
    const { err } = result;
    return res.status(404).json({ err });
  }
  const { venda } = result;
  return res.status(200).json(venda);
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
  const { id } = req.params;

  await update({ id, productId: req.body[0].productId, quantity: req.body[0].quantity });
  return res.status(200).json({
    _id: id, itensSold: [{ productId: req.body[0].productId, quantity: req.body[0].quantity }] });
};

module.exports = { createSales, listAll, saleById, updateSale, deleteSale };
