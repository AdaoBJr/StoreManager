const rescue = require('express-rescue');
const Sales = require('../services/Sales');

const createSale = rescue(async (req, res, _next) => {
  const itensSold = req.body;
  // console.log(itensSold[0].quantity);
  const newSale = await Sales.createSale(itensSold);

  if (typeof newSale === 'object') {
    return res.status(422).json(newSale);
  }

  return res.status(201).json(newSale);
});

module.exports = {
  createSale,
};