// const { objectId } = require('mongodb');
const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const { insertedId: id } = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }));
  return {
    _id: id,
    name,
    quantity,
  };
};
const findByName = async (name) => {
  const findProduct = await connection().then((db) => db.collection('products').findOne({ name }));
  if (!findProduct) return null;
  return findProduct;
};

module.exports = {
  createProduct,
  findByName,
};
