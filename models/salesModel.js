const { ObjectId } = require('mongodb');
const connection = require('./connection');

const registerSales = async (itemSold) => {
  const sales = await connection()
    .then((db) => db.collection('sales').insertMany([{ itensSold: [...itemSold] }]))
      .then((result) => result.ops[0]);

      return sales;
};

const getAllSales = async () => {
  const listAllSales = await connection()
    .then((db) => db.collection('sales').find().toArray());

    return listAllSales;
};

const getSalesId = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const salesId = await connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)));

    return salesId;
};

    module.exports = {
      registerSales,
      getAllSales,
      getSalesId,
    };