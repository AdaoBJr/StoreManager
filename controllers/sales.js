const serviceSale = require('../services/sales');

const create = async (req, res) => {
  const allSales = req.body;
  const { code, err, newSale } = await serviceSale.create(allSales);
  if (err) return res.status(code).json({ err });
  return res.status(code).json(newSale);
};

const getAll = async (_req, res) => {
  const { code, sales } = await serviceSale.getAll();
  return res.status(code).json({ sales });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { code, err, sale } = await serviceSale.getId(id);
  if (err) return res.status(code).json({ err });
  return res.status(code).json(sale);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { code, err, updatedSale } = await serviceSale.update(id, req.body);
  if (err) return res.status(code).json({ err });
  return res.status(code).json(updatedSale);
};

const exclude = async (req, res) => {
  const { id } = req.params;
  const { code, err, sale } = await serviceSale.exclude(id);
  if (err) return res.status(code).json({ err });
  return res.status(code).json(sale);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};
