const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');
const productModel = require('../models/productsModel');

const registerNewSale = async (sales) => {
    const productsRegistered = await productModel.getProducts();
    const validateSales = sales.find(({ productId, quantity }) => {
      if (!ObjectId.isValid(productId)) return true;
      const checkData = productsRegistered.products
      .find(({ _id }) => _id.toString() === productId);
      return checkData === undefined || typeof quantity !== 'number' || quantity < 1;
    });
    if (validateSales) {
    return {
      err: { 
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }
  return salesModel.registerNewSale(sales);
};

module.exports = {
  registerNewSale,
};