const { ObjectId } = require('mongodb');
const { 
  getAllSalesList,
  getSaleById,
  deleteSaleById,
  insertNewSales,
  update,
} = require('../models/Sales');

const createNewSales = async (products) => {  
  const insertedNewSales = await insertNewSales(products);

  return insertedNewSales;
};

const updateSale = async (id, body) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const productIds = [];
  const productQuantitys = [];

  body.forEach(({ productId }) => productIds.push(productId));
  body.forEach(({ quantity }) => productQuantitys.push(quantity));

  const attSale = await update(id, productIds, productQuantitys);

  if (!attSale) {
    return null;
  }

  return attSale;
};

const getSalesList = async () => {
  const allSales = await getAllSalesList();

  return allSales;
};

const saleById = async (id) => {
  const sale = await getSaleById(id);

  if (!sale) return null;

  return sale;
};

const delSaleById = async (id) => {
  const deletedeSale = await deleteSaleById(id);

  if (deletedeSale) {
    return deletedeSale;
  }

  return null;
};

module.exports = {
  getSalesList,
  saleById,
  delSaleById,
  createNewSales,
  updateSale,
};
