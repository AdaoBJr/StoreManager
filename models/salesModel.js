const { ObjectId } = require('mongodb');
const connection = require('./connection');

const registerSale = (sale) =>
  connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: sale }))
  .then((result) => result.ops[0]);

const getAll = () =>
  connection()
  .then((db) => db.collection('sales').find({}).toArray());

const getById = (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
  .then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const updateSale = (id, itensSold) => {
  connection()
  .then((db) => db.collection('sales')
  .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }));

  return { _id: id, itensSold };
};

module.exports = {
  registerSale,
  getAll,
  getById,
  updateSale,
};