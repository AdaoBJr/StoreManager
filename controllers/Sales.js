const rescue = require('express-rescue');
const Sales = require('../services/Sales');

const createSale = rescue(async (req, res, _next) => {
  const itensSold = req.body;
  const newSale = await Sales.createSale(itensSold);
  // console.log(newSale);

  if (typeof newSale.err !== 'undefined') {
    return res.status(422).json(newSale);
  }

  return res.status(200).json(newSale);
});

const getAllSales = rescue(async (_req, res, _next) => {
  const sales = await Sales.getAllSales();

  return res.status(200).json({ sales });
});

const findSaleById = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const sale = await Sales.findSaleById(id);

  if (typeof sale.err !== 'undefined') return res.status(404).json(sale);
  if (!sale) return res.status(404).json(sale);

  return res.status(200).json(sale);
});

const updateSale = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const itemToUpdate = req.body;
  const updatedItem = await Sales.updateSale(id, itemToUpdate);

  if (typeof updatedItem.err === 'object') {
    return res.status(422).json({
      err:
        { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    });
  }

  return res.status(200).json(updatedItem);
});

const deleteSale = rescue(async (req, res, _next) => {
  const { id } = req.params;
  // const sale = await Sales.findSaleById(id);
  const deletedSale = await Sales.deleteSale(id);

  if (!deletedSale) {
    return res.status(422).json({
      err:
        { code: 'invalid_data', message: 'Wrong sale ID format' },
    });
  }

  return res.status(200).json(deletedSale);
});

module.exports = {
  createSale,
  findSaleById,
  getAllSales,
  updateSale,
  deleteSale,
};