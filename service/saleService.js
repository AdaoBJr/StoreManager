// const { ObjectId } = require('mongodb');
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
    /* console.log(body); */
    const valideQte = body.map((sale) => {
      const isProductQuantityValidZero = isValidQuantityZero(sale.quantity);
      const isProductQuantityNotNumber = isValidQuantityNotNumber(sale.quantity);
 /*   console.log(isProductQuantityValidZero, 'valida o zero');
      console.log(isProductQuantityValidZero, 'se for string'); */
      if (!isProductQuantityValidZero || !isProductQuantityNotNumber) return false;
      return true;
    });
    console.log(valideQte[0]);
    if (valideQte[0] === false) {
      return { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' }; 
    }
    const resultModel = await salesModel.create(body);
    return resultModel;
};

module.exports = { create };
