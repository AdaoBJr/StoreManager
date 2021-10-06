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
  
  let STATUS_CODE = 200;
  if (newSale.error) {
    if (newSale.code === 'stock_problem') {
      STATUS_CODE = 404;
    } else {
      STATUS_CODE = 422;
    }
    return res.status(STATUS_CODE).json({ err: newSale });
  }

  res.status(200).json(newSale);
});

const update = rescue(async (req, res) => {
  const { id } = req.params;
  const productArray = req.body;
  
  let STATUS_CODE = 200;
  const updatedSale = await salesService.update(id, productArray);
  if (updatedSale.message) {
  if (updatedSale.code === 'stock_problem') {
      STATUS_CODE = 404;
    } else {
      STATUS_CODE = 422;
    }
    return res.status(STATUS_CODE).json({ err: updatedSale });
  }

  res.status(STATUS_CODE).json(updatedSale);
});

const deleteOne = rescue(async (req, res) => {
  const { id } = req.params;
  
  const deleteSale = await salesService.deleteOne(id);

  if (deleteSale.message) return res.status(422).json({ err: deleteSale });
  res.status(200).json(deleteSale);
});

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteOne,
};