const rescue = require('express-rescue');
const SaleService = require('../services/SaleService');

const create = rescue(async (req, res, next) => {
  const saleAdd = await SaleService.create(req.body);

  if (saleAdd.err) return next(saleAdd.err);

  return res.status(200).json(saleAdd);
});

module.exports = { create };
