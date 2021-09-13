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

const validateId = (id) => {
  if (!ObjectId.isValid(id)) {
    return {
      err: { 
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  return false;
};

const getSalesById = async (id) => {
  // const idNotValid = validateId(id);
  // if (idNotValid) return idNotValid;
  const getSales = await salesModel.getSalesById(id);
  if (!getSales) {
    return {
      err: { 
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }
  return getSales;
};

const updateSale = ({ id, update }) => {
  const idNotValid = validateId(id);
  if (idNotValid) return idNotValid;
  const validateQuantity = update
    .find(({ quantity }) => typeof quantity !== 'number' || quantity < 1);
  if (validateQuantity) {
    return {
      err: { 
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }
  return salesModel.updateSale({ id, update });
};

module.exports = {
  registerNewSale,
  getSalesById,
  updateSale,
};