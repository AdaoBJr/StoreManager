const productsConnection = require('./productsConnection');

const registerProduct = async (name, quantity) => productsConnection()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then((result) => ({ _id: result.insertedId, name, quantity }));

const checkName = async (name) => productsConnection()
  .then((db) => db.collection('products').find({ name }).toArray());

module.exports = { registerProduct, checkName };
