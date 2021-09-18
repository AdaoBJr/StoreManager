// const ObjectId = require('mongodb');
const connection = require('./connection');

const registerSales = async (itemSold) => {
  const sales = await connection()
    .then((db) => db.collection('sales').insertMany([{ itensSold: [...itemSold] }]))
      .then((result) => result.ops[0]);

      return sales;
};
    
    module.exports = {
      registerSales,
    };