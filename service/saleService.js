const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');

const isValidQuantityZero = (quantity) => {
    const moreZero = quantity > 0;    
    if (!moreZero) {
      return false;
    }
    return true;
  };

const isValidQuantityNotNumber = (quantity) => {
  const notNumber = typeof quantity === 'number';
  if (!notNumber) {
    return false;
  }
  return true;
};

const create = async (body) => {
    const valideQte = body.map((sale) => {
      const isProductQuantityValidZero = isValidQuantityZero(sale.quantity);
      const isProductQuantityNotNumber = isValidQuantityNotNumber(sale.quantity);
      if (!isProductQuantityValidZero || !isProductQuantityNotNumber) return false;
      return true;
    });
    if (valideQte[0] === false) {
      return { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' }; 
    }
    const resultModel = await salesModel.create(body);
    return resultModel;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) { 
    return { code: 'not_found', message: 'Sale not found' }; 
  }
  const saleId = await salesModel.getById(id);
  return saleId;
};

module.exports = { create, getById };
