const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () =>
  connection()
    .then((db) => db.collection('sales').find().toArray())
    .then((result) => ({ sales: result }));

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
};

const newSale = async (sale) =>
  connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sale }))
    .then((result) => result.ops[0]);

module.exports = {
  getAll,
  getById,
  newSale,
};
