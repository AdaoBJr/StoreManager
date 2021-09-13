const SaleModel = require('../models/SaleModel');

const isValidQuantity = (quantity) => {
  if (quantity <= 0) {
    return {
      code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
}
  if (!quantity) return { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };

  if (typeof quantity !== 'number') {
     return { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' }; 
}

  return true;
}; 

const createSale = async (body) => {
  body.map((sale) => {
    const { productId, quantity } = sale;
    const isValid = isValidQuantity(quantity);
    if (isValid !== true) return isValid;
    return isValid;
    });
  
  const { id } = await SaleModel.createSale(body);
    
  return {
    code: 200,
    id,
    productId,
    quantity,
  };
};

module.exports = {
  createSale,
};
