const StatusCodes = require('http-status-codes');
const SaleService = require('../services/SaleService');

/* SaleModel pode ser necessário */
// const SaleModel = require('../models/SaleModel');

const createSale = async (req, res) => {
  const { productId, quantity } = req.body;
  const { id, code, message } = await SaleService.createSale(productId, quantity);

  if (message) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ err: { code, message } });
  }

  res.status(code).json({ _id: id, 
    itensSold: {
      productId,
      quantity,
    } });
};

module.exports = {
  createSale,
};