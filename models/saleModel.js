const { ObjectId } = require('mongodb');
const connection = require('./connection');
const { updateProdQuantity } = require('./productModel');

const getAllSalesData = async () => {
  const allSales = await connection()
    .then((db) => db.collection('sales').find().toArray());

  return {
    sales: allSales,
  };
};
