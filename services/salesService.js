const { ObjectId } = require('mongodb');
const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const { ERROR_PROD_ID_OR_QTY, ERROR_SALE_NOT_FOUND, ERROR_SALE_ID_FORMAT } = require('./msgErrors');

// VALIDAÇÕES -----------------------------------------------------------------------------------

const validateQy = (qty) => {
  const invalidQty = 0;
  if (qty <= invalidQty || typeof qty === 'string') {
    throw ERROR_PROD_ID_OR_QTY;
  }
};

const validateId = (id) => (ObjectId.isValid(id));
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

// REQUISITO 6
const getSales = async (id) => {
  const sales = await salesModel.getAllSales();
  const sale = await salesModel.getSaleById(id);

  if (id) {
    if (!validateId(id) || !sale) {
      throw ERROR_SALE_NOT_FOUND;
    } else {
      return {
        status: 200,
        sale,
      };
    }
  }

  return {
    status: 200,
    sales,
  };
};

// REQUISITO 7
const updateSale = async (id, sale) => {
  if (!validateId(id) || !sale.length) {
    throw ERROR_SALE_NOT_FOUND;
  }

  await validateQy(sale[0].quantity);

  const product = await productsModel.getProductById(sale[0].productId);
  product.quantity -= sale[0].quantity;
  await productsModel.updateProduct(sale[0].productId, product);

  const itensSold = [];
  const { _id, itensSold: sold } = await salesModel.updateSale(id, sale);
  itensSold.push(sold);
  const updatedSale = { _id, itensSold };
  return {
    status: 200,
    updatedSale,
  };
};

// REQUISITO 8
const deleteSale = async (id) => {
  const saleExists = await salesModel.getSaleById(id);

  if (!validateId(id) || !saleExists) {
    throw ERROR_SALE_ID_FORMAT;
  }

  const { itensSold } = await salesModel.getSaleById(id);
  console.log(itensSold);
  const product = await productsModel.getProductById(itensSold[0].productId);
  product.quantity += itensSold[0].quantity;
  await productsModel.updateProduct(itensSold[0].productId, product);
  
  const { deletedSale, checkDelete } = await salesModel.deleteSale(id);
  if (!checkDelete) {
    return {
      status: 200,
      deletedSale,
    };
  }
};

// -----------------------------------------------------------------------------------------------

module.exports = {
  createSale,
  getSales,
  updateSale,
  deleteSale,
};