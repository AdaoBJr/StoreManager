const salesService = require('../services/salesService');

const insertSales = async (req, res, _next) => {
  const salesArray = req.body;
  const haveSomeInvalidData = await salesService.validateProductsArray(salesArray);
  if (haveSomeInvalidData) return res.status(422).json(haveSomeInvalidData.errorMessage);
  
  const insertedSales = await salesService.insertSalesProducts(salesArray);

  return res.status(200).json(insertedSales);
};

module.exports = {
  insertSales,
};
