const SaleService = require('../services/SaleService');

const create = async (req, res) => {
  const { body } = req;
  const resultService = await SaleService.create(body);
  console.log(resultService);
  if (resultService.err) return res.status(422).json(resultService);

  return res.status(200).json(resultService);
};

module.exports = {
  create,
};