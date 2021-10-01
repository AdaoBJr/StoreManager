const salesService = require('../services/salesService');

const insertSales = async (req, res, _next) => {
  const salesArray = req.body;
  const haveSomeInvalidData = await salesService.validateProductsArray(salesArray);
  if (haveSomeInvalidData) return res.status(422).json(haveSomeInvalidData.errorMessage);
  
  const updatedItensInStock = await salesService.updateProductQuantity(salesArray, true);

  if (updatedItensInStock) {
    return res.status(404).json(updatedItensInStock.errorMessage);
  }
  
  const insertedSales = await salesService.insertSales(salesArray);

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

const updateSale = async (req, res) => {
  const { id } = req.params;
  const salesArray = req.body;

  const isIdInvalid = await salesService.validateId(id);
  if (isIdInvalid) {
    return res.status(422).json({ err: { 
      code: 'invalid_data', message: 'Wrong product ID or invalid quantity' }, 
    }); 
  }

  const haveSomeInvalidData = await salesService.validateProductsArray(salesArray);
  if (haveSomeInvalidData) return res.status(422).json(haveSomeInvalidData.errorMessage);

  const updatedItensInStock = await salesService.updateProductQuantity(salesArray, false);

  if (updatedItensInStock) {
    return res.status(404).json(updatedItensInStock.errorMessage);
  }

  const updatedSale = await salesService.updateSale(id, salesArray);
  return res.status(200).json(updatedSale);
};

const deleteSale = async (req, res, _next) => {
  const { id } = req.params;

  const isIdInvalid = await salesService.validateId(id);
  if (!isIdInvalid) {
    const currentSale = await salesService.findSaleById(id);
    const updatedInStock = await salesService.updateProductQuantity(currentSale.itensSold, false);

    if (updatedInStock) {
      return res.status(404).json(updatedInStock.errorMessage);
    }

    const deletedCount = await salesService.deleteSaleById(id);
    
    if (deletedCount) return res.status(200).json(currentSale);
  }
  
  return res.status(422).json({ err: { 
    code: 'invalid_data', message: 'Wrong sale ID format' }, 
  });
};

module.exports = {
  insertSales,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
