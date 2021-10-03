const connection = require('./connection');

const getByName = async (name) => connection()
  .then((db) => db.collection('products').findOne({ name }));

const createProduct = async (name, quantity) => {
  const newProduct = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }));
  return { _id: newProduct.insertedId, name, quantity };
};

module.exports = {
  createProduct,
  getByName,
};
