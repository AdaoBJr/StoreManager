const model = require('../models/saleModel');
const service = require('../services/saleService');

const idError = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
};

const getAllSales = async (_req, res) => {
  try {
    const products = await model.getAll();
    return res.status(200).json(products);
  } catch (err) {
    return res.status(422).json(idError);
  }
};

const createSale = async (req, res) => {
  const productsList = req.body;
  const createdSale = await service.createSale(productsList);
  if (createdSale === null) return res.status(422).json(idError);

  return res.status(200).json(createdSale);
};

module.exports = {
  getAllSales, createSale,
};
