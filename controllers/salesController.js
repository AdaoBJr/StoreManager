const salesService = require('../services/salesService');

const insertSales = async (req, res, _next) => {
  const salesArray = req.body;
  const haveSomeInvalidData = await salesService.validateProductsArray(salesArray);
  if (haveSomeInvalidData) return res.status(422).json(haveSomeInvalidData.errorMessage);
  
  const insertedSales = await salesService.insertSalesProducts(salesArray);

  return res.status(200).json(insertedSales);
};

const getAllSales = async (_req, res, _next) => {
  const allSales = await salesService.getAllSales();

  return res.status(200).json(allSales);
};

const getSaleById = async (req, res, _next) => {
  const { id } = req.params;

  const isIdInvalid = await salesService.validateId(id);
  
  if (!isIdInvalid) {
    const found = await salesService.findSaleById(id);
  
    if (found) return res.status(200).json(found);
  }

  return res.status(404).json({
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  }); 
};

module.exports = {
  insertSales,
  getAllSales,
  getSaleById,
};
