const express = require('express');

const rescue = require('express-rescue');
const salesService = require('../services/saleService');

const route = express.Router();

const STATUS_FAIL = 422;
// const NOT_FOUND = 404;
const STATUS_OK = 200;

route.post(
  '/',
  rescue(async (req, res) => {
    const newSale = await salesService.newSales(req.body);

    if (newSale.err) return res.status(STATUS_FAIL).json(newSale);

    return res.status(STATUS_OK).json(newSale);
  }),
);

module.exports = route;