const express = require('express');

const router = express.Router();

const salesService = require('../services/productsService');

const verifyQuantities = (req, res, next) => {
  const newSales = req.body;
  const badQuantities = salesService.verifyQuantities(newSales);
  const quantIsNotnumber = salesService.verifyQuantitiesString(newSales);
  console.log('aqui', badQuantities, quantIsNotnumber);
  if (badQuantities.length !== 0 || quantIsNotnumber.length !== 0) {
 return res.status(422).json({ err: { 
    code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } }); 
}
next();
};

const createSales = (req, res) => {
  const newSales = req.body;
  salesService.createSales(newSales)
  .then((response) => {
    console.log(response);
    return res.status(200).json(response);
});
};

module.exports = {
  router,
  createSales,
  verifyQuantities,
};
