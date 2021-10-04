const { ObjectId } = require('mongodb');
const connection = require('./connection');

const PRODUCTS = 'products';

const getByName = async (name) => {
  return connection()
    .then((db) => db.collection(PRODUCTS).findOne({ 'name': name }));
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return connection()
    .then((db) => db.collection(PRODUCTS).findOne({ _id: ObjectId(id) }));
};

const insertProduct = async (product) => {
  return connection()
    .then((db) => db.collection(PRODUCTS).insertOne(product))
    .then((result) => getById(result.insertedId));
};

module.exports = { 
  insertProduct,
  getByName,
  getById,
};
