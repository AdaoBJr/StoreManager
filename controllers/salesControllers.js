const rescue = require('express-rescue');
const SaleService = require('../services/salesService');

const createSale = rescue(async (req, res) => {
  const { body } = req;
  const Obj = await SaleService.createSale(body);
  if (Obj.err) {
   return res.status(422).json(Obj);
  } 
  return res.status(200).json(Obj);
});

module.exports = {
  createSale,
};