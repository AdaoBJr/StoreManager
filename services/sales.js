const salesModel = require('../models/sales');
const productsModel = require('../models/products');

const updateProductQuantity = (productId, delta) => {
  productsModel.updateProductQuantityInDB(productId, delta);
};

const createSingleSale = (productId, quantity) => {

};

module.exports = {
  updateProductQuantity,
  createSingleSale,
};
