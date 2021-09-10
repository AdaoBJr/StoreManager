const Sale = require('../services/sales.services');

const create = async (req, res) => {
  const allSales = req.body;
  const { code, err, newSale } = await Sale.create(allSales);
  if (err) return res.status(code).json({ err });
  return res.status(code).json(newSale);
};

module.exports = { create };
