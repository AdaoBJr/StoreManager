const connection = require('./connection');

const addProducts = async (name, quantity) => connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
    // .then((result) => getNewProduct({ id: result.insertedId, name, quantity }));

module.exports = {
  addProducts,
};