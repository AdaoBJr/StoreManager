const validators = require('./validators/validators');
const productsService = require('../services/productsService');
const salesService = require('../services/salesService');

const checkCreateProductInput = async (req, res, next ) => {
  const { name, quantity } = req.body;
  const checkResult = validators.checkCreateProductInput(name, quantity);
  if (checkResult.error) { next(checkResult.error);}
  next();
};

const checkRepeatedName = async (req, res, next) => {
  const { name } = req.body;
  const checkResult = await productsService.findName(name);
  if (checkResult) { next({isRepeatedName: true, message: 'Product already exists'});}
  next();
};

const checkId = async ( req, res, next) => {
  const { id } = req.params;
  const validateResult = validators.checkIdInput(id);
  if (validateResult.error) { 
    next({isInvalidId: true, message: 'Wrong id format'}); return null;}

  const checkResult = await productsService.getById(id);
  if (!checkResult) { next({isInvalidId: true, message: 'Wrong id format'});}
  next();
};

const checkSale =  async ( req, res, next) => {
  const saleArray = req.body;
  const result = saleArray.every((sale) => validators.checkSaleQuantity(sale.quantity));
  if (!result) { 
    next({isSaleInvalid: true, message: 'Wrong product ID or invalid quantity'});
  }
  next();
};

const checkSaleId = async (req, res, next) => {
  const { id } = req.params;
  const validateResult = validators.checkIdInput(id);
  if (validateResult.error) {
    next({isSaleIdInvalid: true, message: 'Sale not found'});
    return null;
  }
  const result = await salesService.getSaleById(id);
  if (!result) {
    next({isSaleIdInvalid: true, message: 'Sale not found'});
    return null;
  }
  next();
};

const checkSaleIdFormat = async(req, res, next) => {
  const { id } = req.params;
  const validateResult = validators.checkIdInput(id);
  if (validateResult.error) {
    next({isSaleIdFormatInvalid: true, message: 'Wrong sale ID format'});
    return null;
  }
  const result = await salesService.getSaleById(id);
  if (!result) {
    next({isSaleIdInvalid: true, message: 'Sale not found'});
    return null;
  }
  next();
};

module.exports = {
  checkCreateProductInput,
  checkRepeatedName,
  checkId,
  checkSale,
  checkSaleId,
  checkSaleIdFormat,
};