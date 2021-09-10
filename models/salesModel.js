const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSale = (data) => 
  connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: data }))
  .then((result) => result.ops[0]);

const getAll = () => connection()
.then((db) => db.collection('sales').find({}).toArray());

const getById = (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
  .then((db) => db.collection('sales').findOne(ObjectId(id))); 
};

const editSale = (id, itensSold) => {
  connection()
  .then((db) => db.collection('sales')
  .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }));

  return { _id: id, itensSold };
};

module.exports = { 
  createSale,
  getAll,
  getById,
  editSale,
};