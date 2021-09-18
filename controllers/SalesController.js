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
  return res.status(200).json(allSales);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const sale = await SaleService.findById(id);
  if (sale === null || sale.err) return res.status(404).json(sale);
  return res.status(200).json(sale);
};

const update = async (req, res) => {
  const { id } = req.params;
  const [saleArray] = req.body;
  const sale = await SaleService.update({ id, saleArray });

  if (sale.err) return res.status(422).json(sale);

  return res.status(200).json(sale);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const deletedSale = await SaleService.deleteById(id);
  console.log(deletedSale);
  if (deletedSale.err) return res.status(422).json(deletedSale);

  return res.status(200).json(deletedSale);
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  deleteById,
};