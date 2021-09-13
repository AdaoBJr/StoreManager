// const { ObjectId } = require('mongodb');
const salesModels = require('../models/salesModels');
const { isValidQuantitySales } = require('../middlewares/validations');

const createSale = async (body) => {
  const validQuantity = body.map((obj) => {
    const isValidQuatity = isValidQuantitySales(obj.quantity);
    
    if (isValidQuatity.err) return isValidQuatity;
    return isValidQuatity;
  });
  
  if (validQuantity[0].err) return validQuantity[0];

  // const a = validQuantity.some((element) => element !== true);
  // if (a) return validQuantity;
  
  const returnModel = await salesModels.createSale(body);
  return returnModel;
};

module.exports = {
   createSale,
  // getAll,
  // getProductById,
  // updateProduct,
  // exclude,
};