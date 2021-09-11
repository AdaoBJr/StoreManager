const express = require('express');

const router = express.Router();

const salesService = require('../services/salesService');

const verifyQuantities = (req, res, next) => {
  const newSales = req.body;
  const badQuantities = salesService.verifyQuantities(newSales);
  const quantIsNotnumber = salesService.verifyQuantitiesString(newSales);
  if (badQuantities.length !== 0 || quantIsNotnumber.length !== 0) {
 return res.status(422).json({ err: { 
    code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } }); 
}
next();
};

const createSales = (req, res) => {
  const newSales = req.body;
  salesService.createSales(newSales)
  .then((response) => res.status(200).json(response));
};

const getAll = (req, res) => salesService.getAll()
.then((result) => res.status(200).json({ sales: result }));

const getById = (req, res) => {
  const { id } = req.params;
  salesService.getById(id)
  .then((result) => {
    if (result === null) {
      return res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
    }
  return res.status(200).json(result);
})
  .catch(() => res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } }));
};

const editSale = (req, res) => {
  const { id } = req.params;
  const editedSale = req.body;
  salesService.editSale(id, editedSale)
  .then((result) => res.status(200).json(result));
};

const deleteSale = (req, res) => {
  const { id } = req.params;
  salesService.deleteSale(id)
  .then((result) => res.status(200).json(result))
  .catch(() => res.status(422).json({ err: { 
    code: 'invalid_data', message: 'Wrong sale ID format' } }));
};

module.exports = {
  router,
  createSales,
  verifyQuantities,
  getAll,
  getById,
  editSale,
  deleteSale,
};