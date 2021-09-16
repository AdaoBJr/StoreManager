const connection = require('./connection');

const getAllProducts = async () => (
  connection().then((db) => db.collection('products').find({}).toArray())
);

module.exports = {
  getAllProducts,
};
