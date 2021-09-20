const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');
// const productModel = require('../models/productsModel');

const verifyId = (id) => {
  if (!ObjectId.isValid(id)) {
    return {
      err: {
        status: 422,
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }
  return false;
};

const verifyQuantity = (quantity) => {
  const minQuantity = 1;
  if (Number(quantity) < minQuantity || typeof quantity !== 'number') {
    return {
      err: {
        status: 422,
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }
  return false;
};

const createSale = async (newSale) => {
  // const products = await productModel.getAllProducts();
  let salesNotIsValid = false;

  newSale.forEach(({ productId, quantity }) => {
    const idNotIsValid = verifyId(productId);
    const quantityNotIsValid = verifyQuantity(quantity);

    if (idNotIsValid.err) salesNotIsValid = true;
    if (quantityNotIsValid.err) salesNotIsValid = true;
  });

  if (salesNotIsValid === false) return salesModel.addSale(newSale);
  return {
    err: {
      status: 422,
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    },
  };
};

const verifyExistenceId = async (id) => {
  const sales = await salesModel.getSalesById(id);
  if (!sales || !sales[0]) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  return sales;
};

const updateSale = async (id, update) => {
  const { productId, quantity } = update[0];
  const quantityNotIsValid = verifyQuantity(quantity);
  const productIdNotIsValid = verifyId(productId);
  const idExists = verifyExistenceId(id);

  if (quantityNotIsValid) return quantityNotIsValid;
  if (productIdNotIsValid) return productIdNotIsValid;
  if (idExists.err) return idExists;
  return salesModel.updateSale(id, update);
};

const deleteSale = async (id) => {
  const saleExists = await verifyExistenceId(id);

  if (!saleExists.err) return salesModel.deleteSale(id);
  return saleExists;
};

module.exports = {
  verifyId,
  verifyQuantity,
  createSale,
  verifyExistenceId,
  updateSale,
  deleteSale,
};
