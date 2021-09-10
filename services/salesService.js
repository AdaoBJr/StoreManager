// const { ObjectId } = require('mongodb');
const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const { ERROR_PROD_ID_OR_QTY } = require('./msgErrors');

// VALIDAÇÕES -----------------------------------------------------------------------------------

const validateQy = (qty) => {
  const invalidQty = 0;
  if (qty <= invalidQty || typeof qty === 'string') {
    throw ERROR_PROD_ID_OR_QTY;
  }
};

// const validateId = (id) => (ObjectId.isValid(id));
// verifica se o valor passado é um id no válido - padrão mongoDB

// -----------------------------------------------------------------------------------------------

// REQUISITO 5
// PAREI AQUI, DAR CONTINUIDADE NO UPDATESALE E DELETESALE
const createSale = async (sale) => {
  const { productId, quantity } = sale[0];

    const validateID = await productsModel.getProductById(productId);
    if (!validateID) { throw ERROR_PROD_ID_OR_QTY; }
    await validateQy(quantity);
    
    const product = await productsModel.getProductById(productId);
    product.quantity -= quantity;
    await productsModel.updateProduct(productId, product);

  const createdSale = await salesModel.createSale(sale);

  return {
    status: 200,
    createdSale,
  };
};

// -----------------------------------------------------------------------------------------------

module.exports = {
  createSale,
};