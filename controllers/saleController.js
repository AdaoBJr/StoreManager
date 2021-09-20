const saleService = require('../services/saleService');

async function save(req, res) {
  const sales = await saleService.save(req.body);
  if (sales.err) return res.status(422).json(sales);
  return res.status(200).json(sales);
}

async function findById(req, res) {
  const { id } = req.params;

  const sales = await saleService.findById(id);

  if (sales.err) return res.status(404).json(sales);

  return res.status(200).json(sales);
}

async function list(_req, res) {
  const sales = await saleService.list();

  return res.status(200).json({ sales });
}

module.exports = {
  save,
  findById,
  list,
};