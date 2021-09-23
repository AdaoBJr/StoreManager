const service = require('../services/SalesServices');

async function newSale(req, res) {
  const sale = req.body;
  const result = await service.newSale(sale);
  return res.status(200).json(result);
}

async function fetchSales(_req, res) {
  const result = await service.fetchSales();
  return res.status(200).json(result);
}

async function findById(req, res) {
  const { id } = req.params;
  const result = await service.findById(id);
  return res.status(200).json(result);
}

async function updateSale(req, res) {
  const { id } = req.params;
  const sale = req.body;
  const result = await service.updateSale(id, sale);
  return res.status(200).json(result);
}

async function deleteSale(req, res) {
  const { id } = req.params;
  const result = await service.deleteSale(id);
  return res.status(200).json(result);
}

module.exports = {
  newSale,
  fetchSales,
  findById,
  updateSale,
  deleteSale,
};
