const rescue = require('express-rescue');
const salesService = require('../services/salesService');

const getById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const sale = await salesService.getById(id);

  if (sale.error) return next(sale);

  res.status(200).json(sale);
});

const getAll = rescue(async (_req, res, next) => {
  const products = await salesService.getAll();

  if (products.error) return next(products);

  res.status(200).json(products);
});

const create = rescue(async (req, res) => {
  const productArray = req.body;
  
  const newSale = await salesService.create(productArray);
  if (newSale === null) {
    return res.status(404).json({
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
      },
    });
  }  
  return res.status(200).json(newSale);
});

const update = rescue(async (req, res, next) => {
  const { id } = req.params;
  const productArray = req.body;
  
  const updatedSale = await salesService.update(id, productArray);
  if (updatedSale.error) return next(updatedSale);

  return res.status(200).json(updatedSale);
});

const deleteOne = rescue(async (req, res, next) => {
  const { id } = req.params;
  
  const deleteSale = await salesService.deleteOne(id);
  if (deleteSale.error) return next(deleteSale);

  return res.status(200).json(deleteSale);
});

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteOne,
};