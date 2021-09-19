const serviceSale = require('../services/sales');

const create = async (req, res) => {
  const allSales = req.body;
  const { code, err, newSale } = await serviceSale.create(allSales);
  if (err) return res.status(code).json({ err });
  return res.status(code).json(newSale);
};

module.exports = { create };
