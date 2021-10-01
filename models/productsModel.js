const connection = require('./connection');

const findProductByName = async (name) => {
  const product = await connection()
  .then((db) => db.collection('products').findOne({ name }));

  if (!product) return null;

  return product;
};

const createProduct = ({ name, quantity }) =>
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => result.ops[0]);

module.exports = {
  findProductByName,
  createProduct,
};