const connection = require('./connection');

const addSale = async (saleArray) => connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: saleArray }))
      .then((result) => ({ _id: result.insertedId, itensSold: saleArray }));

const getAllSales = async () => connection()
  .then((db) => db.collection('sales').find().toArray());

module.exports = { addSale, getAllSales };
