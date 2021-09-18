const SaleService = require('../services/SaleService');
const SaleModel = require('../models/SalesModel');

const create = async (req, res) => {
  // agradecimento ao amigo Lucas Lotar pela ajuda no entendimento da lógica.
  const { body } = req;
  const resultService = await SaleService.create(body);
  if (resultService.err) return res.status(422).json(resultService);

  return res.status(200).json(resultService);
};

const getAll = async (_req, res) => {
  const allSales = await SaleModel.getAll();
  console.log(allSales);
  return res.status(200).json(allSales);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const sale = await SaleService.findById(id);
  if (sale === null || sale.err) return res.status(404).json(sale);
  return res.status(200).json(sale);
};

module.exports = {
  create,
  getAll,
  findById,
};