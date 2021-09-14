const saleService = require('../services/saleService');

const create = async (req, res, next) => {
  const sales = await saleService.createSale(req.body);
  if (sales.err) {
    return next(sales.err);
  }
  return res.status(200).json(sales);
};

module.exports = {
  create,
};