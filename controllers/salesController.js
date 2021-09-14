const express = require('express');

const router = express.Router();
const salesModel = require('../models/salesModel');
const { saleQuatityCheck, idRemoveCheck } = require('../services/SalesService');

const STATUS_OK = 200;
const STATUS_ERROR_NOT_FOUND = 404;
const STATUS_ERROR_SERVER = 500;
const errorServerMessage = { message: 'System Unavailable' };

router.post('/', saleQuatityCheck, async (req, res) => {
  try {
    const salesArr = req.body;
    const newSale = await salesModel.addNewSale(salesArr);
    res.status(STATUS_OK).json(newSale);
  } catch (error) {
    res.status(STATUS_ERROR_SERVER).send(errorServerMessage);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesModel.getByIdSale(id);
    if (!sale) {
      res.status(STATUS_ERROR_NOT_FOUND).json({
        err: {
          code: 'not_found',
          message: 'Sale not found',
        },
      });
    }
    res.status(STATUS_OK).json(sale);
  } catch (error) {
    res.status(STATUS_ERROR_SERVER).send(errorServerMessage);
  }
});

router.get('/', async (req, res) => {
  try {
    const sales = await salesModel.getAllSales();
    res.status(STATUS_OK).json({ sales });
  } catch (error) {
    res.status(STATUS_ERROR_SERVER).send(errorServerMessage);
  }
});

router.put('/:id', saleQuatityCheck, async (req, res) => {
  try {
    const { id } = req.params;
    const saleUpdate = req.body;
    const saleUpdated = await salesModel.updateIdSale(id, saleUpdate);
    res.status(STATUS_OK).json(saleUpdated);
  } catch (error) {
    res.status(STATUS_ERROR_SERVER).send(errorServerMessage);
  }
});

router.delete('/:id', idRemoveCheck, async (req, res) => {
  try {
    const { id } = req.params;
    const saleRemoved = await salesModel.removeSale(id);
    res.status(STATUS_OK).json(saleRemoved);
  } catch (error) {
    res.status(STATUS_ERROR_SERVER).send(errorServerMessage);
  }
});

module.exports = router;
