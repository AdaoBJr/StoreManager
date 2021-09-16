const { ObjectId } = require('mongodb');
const { getAllSalesList, getSaleById, deleteSaleById } = require('../models/Sales');

const verifyProducts = async (products) => {
  console.log(products);
  if (products.some(({ productId }) => !ObjectId.isValid(productId))) {
    return null;
  }

  return { message: 'cheguei' };
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
  verifyProducts,
};
