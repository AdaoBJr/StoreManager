const saleService = require('../services/saleService');
const saleModel = require('../models/saleModel');

const create = async (req, res, next) => {
  const sales = await saleService.createSale(req.body);
  if (sales.err) {
    return next(sales.err);
  }
  return res.status(200).json(sales);
};

const getAll = async (_req, res) => {
  const findAll = await saleModel.getAll();
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

module.exports = {
  create,
  getAll,
  getById,
};