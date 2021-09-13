const SaleModel = require('../models/SaleModel');

const isValidQuantity = (quantity) => {
  if (quantity <= 0) {
    return {
      code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' };
}
  if (!quantity) return { code: 'invalid_data', message: '"quantity" is required' };

  if (typeof quantity !== 'number') {
     return { code: 'invalid_data', message: '"quantity" must be a number' }; 
}

  return true;
}; 

const createSales = async (productId, quantity) => {
  const isValid = isValidQuantity(quantity);
  if (isValid !== true) return isValid;

  const sale = await SaleModel.createSale({
    productId,
    quantity,
  });

  return sale;
};

module.exports = {
  createSales,
};
