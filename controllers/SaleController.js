const StatusCodes = require('http-status-codes');
const SaleService = require('../services/SaleService');

/* SaleModel pode ser necessário */
// const SaleModel = require('../models/SaleModel');

const createSale = async (req, res) => {
  const { name, quantity } = req.body;

  const { id, code, message } = await SaleService.createSales(productId, quantity);

  if (message) { 
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
    .json({ err: { code, message } }); 
}
  res.status(code).json({ _id: id, name, quantity });
};