const { create } = require('../services/salesServices');

const createSales = async (req, res) => {
  const sale = req.body;

  const sales = await create(sale);
  const { _id } = sales;
  if (!_id) {
    return res.status(404).json(sales);
  }
  return res.status(200).json(sales);
};

module.exports = { createSales };
