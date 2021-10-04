const { ObjectId } = require('mongodb');
const connection = require('./connection');

const PRODUCTS = 'products';

async function getByName(name) {
  return connection()
    .then((db) => db.collection(PRODUCTS).findOne({ name }));
}

async function getById(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return connection()
    .then((db) => db.collection(PRODUCTS).findOne({ _id: ObjectId(id) }));
}

async function insertProduct(product) {
  return connection()
    .then((db) => db.collection(PRODUCTS).insertOne(product))
    .then((result) => getById(result.insertedId));
}

module.exports = { 
  insertProduct,
  getByName,
  getById,
};
