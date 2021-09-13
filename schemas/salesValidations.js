// const { ObjectID } = require('mongodb');

const Products = require('../models/Products');
// const Sales = require('../models/Sales');

const INVALID_DATA = 'invalid_data';

const validateProductIdOfSales = async (sales) => {
  const allProducts = await Products.getAllProducts();
  if (allProducts.message) return { message: allProducts.message };

  const allIds = allProducts.map(({ _id }) => _id);

  const validatingProductIdsOfSales = sales.some(({ productId }) => {
    const verifyingIdOfProducts = allIds.some((id) => productId === id);
    if (verifyingIdOfProducts) return false;

    return true;
  });

  if (validatingProductIdsOfSales) {
    return {
      code: INVALID_DATA,
      message: 'Some "productId" informed does not exist',
    }; 
  }

  return true;
};

const validateQuantity = (sales) => {
  const allQuantitys = sales.map(({ quantity }) => quantity);

  const verifyingQtyConditions = allQuantitys.some((qty) => {
    if (!qty || qty < 0 || typeof qty !== 'number') return true;

    return false;
  });
  if (verifyingQtyConditions) {
    return {
      code: INVALID_DATA,
      message: 'Wrong product ID or invalid quantity',
    };
  }

  return true;
};

module.exports = {
  validateProductIdOfSales,
  validateQuantity,
};
