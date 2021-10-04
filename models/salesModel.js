const { ObjectId } = require('mongodb');
const connection = require('./connection');

const SALES = 'sales';

async function getById(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return connection()
    .then((db) => db.collection(SALES).findOne({ _id: ObjectId(id) }));
}

async function insertProduct(products) {
  return connection()
    .then((db) => db.collection(SALES).insertOne({ itensSold: products }))
    .then((result) => getById(result.insertedId));
}

async function getAll() {
  return connection()
    .then((db) => db.collection(SALES).find({}).toArray());
}

module.exports = { 
  insertProduct,
  getById,
  getAll,
};
