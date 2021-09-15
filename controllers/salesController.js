const salesService = require('../services/salesService');

const NOT_FOUND = 404;
// const UNPROCESSABLE_ENTITY = 422;
const OK = 200;

const validQuantity = (req, res, next) => {
  console.log(req.body, 'body');
  const { body } = req;
  const verifyTypeQuantity = salesService.verifyTypeQuantity(body);
  const verifyQuantity = salesService.verifyQuantity(body);

  if (verifyTypeQuantity.length !== 0 || verifyQuantity.length !== 0) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  next();
};

const creteSales = async (req, res) => {
  const { body } = req;
  const created = await salesService.createSales(body);

  // console.log(created, 'controller');
  return res.status(200).json(created);
};

const AllSales = async (req, res) => {
  const getAllSales = await salesService.verifyAllSales();
  console.log(getAllSales, 'controller');

  if (!getAllSales) {
    return res.status(NOT_FOUND).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
  return res.status(OK).json({ sales: getAllSales });
};

const validId = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.verifyId(id);
  console.log(sale, 'sale controller');

  if (!sale) {
    return res.status(NOT_FOUND).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
  return res.status(OK).json(sale);
};

module.exports = {
  validQuantity,
  creteSales,
  AllSales,
  validId,
};