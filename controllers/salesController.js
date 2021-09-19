const salesService = require('../services/salesService');
const salesErr = require('./err/salesErr');

async function create(req, res) {
  const { body } = req;
  const createSales = await salesService.create(body);
  
  if (createSales === 'invalid quantity') res.status(422).json(salesErr.errSale);

  return res.status(200).json(createSales);
}

module.exports = {
  create,
};