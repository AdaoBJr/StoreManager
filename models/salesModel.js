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

module.exports = { 
  createSale,
  getAll,
  getById,
};
