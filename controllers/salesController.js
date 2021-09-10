const express = require('express');

const rescue = require('express-rescue');
const salesService = require('../services/saleService');

const route = express.Router();

const STATUS_FAIL = 422;
const NOT_FOUND = 404;
const STATUS_OK = 200;

route.post(
  '/',
  rescue(async (req, res) => {
    const newSale = await salesService.newSales(req.body);

    if (newSale.err) return res.status(STATUS_FAIL).json(newSale);

    return res.status(STATUS_OK).json(newSale);
  }),
);

route.get(
  '/',
  rescue(async (req, res) => {
    const sale = await salesService.getSales();
    return res.status(STATUS_OK).json(sale);
  }),
);

route.get(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const saleId = await salesService.findSales(id);
    if (saleId.err) return res.status(NOT_FOUND).json(saleId);

    return res.status(STATUS_OK).json(saleId);
  }),
);

route.put(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const updateSale = await salesService.updateSales(id, req.body);
    if (updateSale.err) return res.status(STATUS_FAIL).json(updateSale);

    return res.status(STATUS_OK).json(updateSale);
  }),
);

route.delete(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const deleteSales = await salesService.deleteSales(id);
    if (deleteSales.err) return res.status(STATUS_FAIL).json(deleteSales);

    return res.status(STATUS_OK).json(deleteSales);
  }),
);

module.exports = route;