const { criar } = require('../services/vendas.service');

const createSales = async (req, res) => {
  const result = req.body;

  const sales = await criar(result);
  return res.status(200).json(sales);
};

module.exports = { createSales };
