const saleService = require('../services/saleService');

async function save(req, res) {
  const sales = await saleService.save(req.body);
  if (sales.err) return res.status(422).json(sales);
  return res.status(200).json(sales);
}

module.exports = {
  save,
};