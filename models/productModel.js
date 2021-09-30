const connection = require('./connection');

const PRODUCTS = 'products';

const create = async (name, quantity) => connection()
    .then((db) => db.collection(PRODUCTS).insertOne({
      name,
      quantity,
    }));

const getProductByName = async (name) => connection()
    .then((db) => db.collection(PRODUCTS).findOne({ name }));

module.exports = {
  create,
  getProductByName,
};
