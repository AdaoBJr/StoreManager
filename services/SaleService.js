const SaleModel = require('../models/SaleModel');
const ProductModel = require('../models/ProductModel');

const create = async (sale) => {
  const checkProducts = sale.map(({ productId, quantity }) => {
    const product = ProductModel.findById(productId);

    if (!product || quantity <= 0 || !Number.isInteger(quantity)) return false; 

    return true;
  });

  if (checkProducts.includes(false)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }

  return SaleModel.create(sale);
};

module.exports = { create };
