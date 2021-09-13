const SaleModel = require('../models/SaleModel');

const isValidQuantity = (quantity) => {
  if (quantity <= 0) {
    return {
      code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
}
  if (!quantity) return { code: 'invalid_data', message: '"quantity" is required' };

  if (typeof quantity !== 'number') {
     return { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' }; 
}

  return true;
}; 

const createSale = async (productId, quantity) => {
  const isValid = isValidQuantity(quantity);
  if (isValid !== true) return isValid;

  const { id } = await SaleModel.createSale({
    productId,
    quantity,
  });

  return {
    code: 201,
    id,
    productId,
    quantity,
  };
};

module.exports = {
  createSale,
};
