const connection = require('./connection');

const getAll = async () =>
  connection()
    .then((db) => db.collection('sales').find().toArray());

const newSale = async (sale) =>
  connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sale }))
    .then((result) => result.ops[0]);

module.exports = {
  newSale,
  getAll,
};
