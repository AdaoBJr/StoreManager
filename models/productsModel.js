const { objectId } = require('mongodb');
const connection = require('./connection');

const PRODUCTS = 'products';

const getByName = async (name) => connection()
  .then((db) => db.connection(PRODUCTS).findOne({ name }));

const getById = async (id) => {
  if (!objectId.isValid(id)) {
    return null;
  }
  return connection()
    .then((db) => db.connection(PRODUCTS).findOne({ _id: id }));
};

const insertProduct = async (product) => connection()
  .then((db) => db.connection(PRODUCTS).insertOne(product))
  .then((result) => getById(result.insertedId));

module.exports = { 
  insertProduct,
  getByName,
};
