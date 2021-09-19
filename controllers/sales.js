const serviceSale = require('../services/sales');

const create = async (req, res) => {
  const allSales = req.body;
  const { code, err, newSale } = await serviceSale.create(allSales);
  if (err) return res.status(code).json({ err });
  return res.status(code).json(newSale);
};

const getAll = async (_req, res) => {
  const { code, sales } = await Sale.getAll();
  return res.status(code).json({ sales });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { code, err, sale } = await Sale.getSaleById(id);
  if (err) return res.status(code).json({ err });
  return res.status(code).json(sale);
};

module.exports = {
  create,
  getAll,
  getById,
};
