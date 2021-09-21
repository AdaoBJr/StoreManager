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

async function edit(req, res) {
  const { id } = req.params;
  const sales = await saleService.edit(id, req.body);
  if (sales.err) return res.status(422).json(sales);
  return res.status(200).json(sales);
}

async function remove(req, res) {
  const { id } = req.params;
  const saleDeleted = await saleService.remove(id);
  if (saleDeleted.err) return res.status(422).json(saleDeleted);
  return res.status(200).json(saleDeleted);
}

module.exports = {
  save,
  findById,
  list,
  edit,
  remove,
};