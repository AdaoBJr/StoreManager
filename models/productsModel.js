const connection = require('./connection');

const createProduct = async (name, quantity) => 
  connection()
    .then((db) => db.collection('products').insertOne({
      name,
      quantity,
    }));

module.exports = {
  createProduct,
};