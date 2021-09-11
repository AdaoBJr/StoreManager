// const { ObjectId } = require('mongodb');
const productsConnection = require('./productsConnection');

const registerProduct = async (name, quantity) => productsConnection()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then((result) => ({ id: result.insertedId, name, quantity }));

module.exports = { registerProduct };
