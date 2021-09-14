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

const mapBody = (arrBody) => {
  const valideQte = arrBody.map((sale) => {
    const isProductQuantityValidZero = isValidQuantityZero(sale.quantity);
    const isProductQuantityNotNumber = isValidQuantityNotNumber(sale.quantity);
    if (!isProductQuantityValidZero || !isProductQuantityNotNumber) return false;
    return true;
  });
  return valideQte[0];
};

const create = async (body) => {
   /*  const valideQte = body.map((sale) => {
      const isProductQuantityValidZero = isValidQuantityZero(sale.quantity);
      const isProductQuantityNotNumber = isValidQuantityNotNumber(sale.quantity);
      if (!isProductQuantityValidZero || !isProductQuantityNotNumber) return false;
      return true;
    }); */
    if (mapBody(body) === false) {
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

const update = async (id, body) => {
 /*  const valideQteUpdate = body.map((sale) => {
    const isProductQuantityValidZero = isValidQuantityZero(sale.quantity);
    const isProductQuantityNotNumber = isValidQuantityNotNumber(sale.quantity);
    if (!isProductQuantityValidZero || !isProductQuantityNotNumber) return false;
    return true;
  }); */
  if (mapBody(body) === false) {
    return { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' }; 
  }
  const saleUpdate = await salesModel.update(id, body);
/*  console.log(saleUpdate);  */
  return saleUpdate;
};

module.exports = { create, getById, update };
