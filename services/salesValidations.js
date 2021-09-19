const { ObjectId } = require('mongodb');
const salesModels = require('../models/saleModels');

const validateNotString = (quantity) => {
  if (typeof quantity === 'string') {
    return false;
  }
  return true;
};

const validateSaleQuantity = (quantity) => {
  if (quantity <= 0) {
    return false;
  }
  return true;
};

// função feita com ajuda de Felippe Correia
const mapSales = (body) => {
  const salemap = body.map((s) => {
    const validQuantNotString = validateNotString(s.quantity);
    const validSaleQuantity = validateSaleQuantity(s.quantity);
    if (!validQuantNotString || !validSaleQuantity) {
      return false;
    }
    return true;
  });
  return salemap[0];
};

const validateCreateSale = async (body) => {
  if (mapSales(body) === false) {
    return { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
  }
  const createSale = await salesModels.createSales(body);
  return createSale;
};

const validateFindAllSales = async () => {
  const findAllSales = await salesModels.findAllSales();
  return findAllSales;
};

const validateFindSalesById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { code: 'not_found', message: 'Sale not found' };
  }
  const findSalesById = await salesModels.findSalesById(id);
  if (!findSalesById) return { code: 'not_found', message: 'Sale not found' };
  return findSalesById;
};

const validateUpdateSale = async (id, body) => {
  if (mapSales(body) === false) {
    return { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
  }
  const updateSale = await salesModels.updateSale(ObjectId(id), body);
  return updateSale;
};

const validateDeleteSale = async (id) => {
  if (!ObjectId.isValid(id)) { 
    return { code: 'invalid_data', message: 'Wrong sale ID format' }; 
  }
  const { _id } = await validateFindSalesById(id);
  if (!_id) return { err: { code: 'not_found', message: 'Sale not found' } };
  await salesModels.deleteSale(id);
  return _id;
};

module.exports = {
  validateCreateSale,
  validateFindAllSales,
  validateFindSalesById,
  validateUpdateSale,
  validateDeleteSale,
};
