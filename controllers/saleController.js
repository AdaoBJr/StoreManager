const express = require('express');
const saleService = require('../services/saleService');

const saleRouter = express.Router();

saleRouter.post('/', async (req, res) => {
  const itensSold = req.body;

  const { status, messageResult } = await saleService.createSale({ itensSold });

  return res.status(status).json(messageResult);
});

module.exports = {
  saleRouter,
};