const salesValidations = require('../services/salesValidations');

const createSale = async (req, res) => {
  const { body } = req;
  const create = await salesValidations.validateCreateSale(body);
  const { _id, code, message } = create;
  if (message) {
    return res.status(422).json({ err: { code, message } });
  }
  return res.status(200).json({ _id, itensSold: [...req.body] });
};

const findAllSales = async (_req, res) => {
  const allSales = await salesValidations.validateFindAllSales();
  res.status(200).json({ sales: allSales });
};

const findSalesById = async (req, res) => {
  const { id } = req.params;
  const salesById = await salesValidations.validateFindSalesById(id);
  const { code, message } = salesById;
  if (message) {
    return res.status(404).json({ err: { code, message } });
  }
  return res.status(200).json(salesById);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const update = await salesValidations.validateUpdateSale(id, body);
  const { code, message } = update;
  if (message) {
    return res.status(422).json({ err: { code, message } });
  }
  return res.status(200).json(update);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const deleted = await salesValidations.validateDeleteSale(id);
  const { code, message } = deleted;
  if (message) {
    return res.status(422).json({ err: { code, message } });
  }
  return res.status(200).json(deleted);
};

module.exports = {
  createSale,
  findAllSales,
  findSalesById,
  updateSale,
  deleteSale,
};
