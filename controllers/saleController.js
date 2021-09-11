const service = require('../services/saleService');

const UNPROCESSABLE = 422;
const HTTP_OK_STATUS = 200;

const validQuantityOnSale = async (req, res, next) => {
  const sale = req.body;
  const checkQtd = await service.validateQuantity(sale);
  if (!checkQtd) {
    return res.status(UNPROCESSABLE)
        .json({ err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        } });
  }
  next();
};

const createSale = async (req, res) => {
  const sale = req.body;
  const sales = await service.create(sale);
  res.status(HTTP_OK_STATUS).json(sales);
};

module.exports = { createSale, validQuantityOnSale };
