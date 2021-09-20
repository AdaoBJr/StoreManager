const salesService = require('../services/salesService');
const salesErr = require('./err/salesErr');

async function getAll(_req, res) {
  const sales = await salesService.getAll();
  return res.status(200).json({ sales });
}

async function getById(req, res) {
  const { id } = req.params;
  const sale = await salesService.getById({ id });

  if (sale === 'id not exists') res.status(404).json(salesErr.errNotExists);

  return res.status(200).json(sale);
}

async function create(req, res) {
  const { body } = req;
  const createSales = await salesService.create(body);
  
  if (createSales === 'invalid quantity') res.status(422).json(salesErr.errSale);

  return res.status(200).json(createSales);
}

async function remove(req, res) {
  const { id } = req.params;
  const sale = await salesService.remove({ id });

  if (sale === 'id not exists') res.status(422).json(salesErr.errNotExistsRemove);

  return res.status(200).json(sale);
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
};