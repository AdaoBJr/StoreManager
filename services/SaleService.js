const { ObjectId } = require('mongodb');
const SaleModel = require('../models/SaleModel');

const errorMessage = 'Wrong product ID or invalid quantity';

const isValidQuantity = (quantity) => {
  if (quantity <= 0) {
    return {
      code: 'invalid_data', message: errorMessage };
}
  if (!quantity) return { code: 'invalid_data', message: errorMessage };

  if (typeof quantity !== 'number') {
     return { code: 'invalid_data', message: errorMessage }; 
}

  return true;
}; 

const createSale = async (body) => {
  const validQuantity = body.map((sale) => {
    const quantityValidation = isValidQuantity(sale.quantity);
    if (quantityValidation !== true) {
      return quantityValidation;
    }
  
    return true;
  });

  if (validQuantity[0] !== true) {
    return { code: 'invalid_data', message: errorMessage };
  }
  
  const sale = await SaleModel.createSale(body);
  
  return sale;
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { code: 'not_found', message: 'Sale not found' };
  }

  const sale = await SaleModel.getSaleById(id);

  if (!sale) return { code: 'not_found', message: 'Sale not found' };

  return sale;
};

const updateSale = async (id, sale) => {
  const validQuantity = sale.map((sales) => {
    const quantityValidation = isValidQuantity(sales.quantity);
    if (quantityValidation !== true) {
      return quantityValidation;
    }
    
    return true;
  });

  if (validQuantity[0] !== true) {
    return { code: 'invalid_data', message: errorMessage };
  }
  
  const sales = await SaleModel.updateSale(id, sale);
  
  return sales;
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { code: 'invalid_data', message: 'Wrong sale ID format' };
  }
  const { _id } = await getSaleById(id);
  
  if (!_id) return { code: 'not_found', message: 'Sale not found' };
  
  await SaleModel.deleteSale(id);
  
  return _id;
};
 
  module.exports = {
  createSale,
  getSaleById,
  updateSale,
  deleteSale,
};
