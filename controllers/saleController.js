const saleService = require('../services/saleService');

const create = async (req, res, next) => {
  const sales = await saleService.createSale(req.body);
  if (sales.err) {
    return next(sales.err);
  }
  return res.status(200).json(sales);
};

const getAll = async (_req, res) => {
  const findAll = await saleService.getAll();
  return res.status(200).json(findAll);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const findId = await saleService.getById(id);
  if (findId.err) {
    return next(findId.err);
  }
  return res.status(200).json(findId);
};

const updateId = async (req, res, next) => {
  const { id } = req.params;
  const update = saleService.updateId(id, req.body);
  if (update.err) {
    return next(update.err);
  }
  return '';
};

module.exports = {
  create,
  getAll,
  updateId,
  getById,
};