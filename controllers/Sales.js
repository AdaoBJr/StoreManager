const rescue = require('express-rescue');
const Sales = require('../services/Sales');

const createSale = rescue(async (req, res, _next) => {
  const itensSold = req.body;
  const newSale = await Sales.createSale(itensSold);
  console.log(newSale);

  if (typeof newSale.err !== 'undefined') {
    return res.status(422).json(newSale);
  }

  return res.status(200).json(newSale);
});

module.exports = {
  createSale,
};