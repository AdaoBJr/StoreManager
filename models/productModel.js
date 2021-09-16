const connection = require('./connection');

const productExists = async (name) => {
  const product = await connection.getConnection()
    .then((db) => db.collection('products').findOne({ name }));
  
  return product !== null;
};

const createProduct = async ({ name, quantity }) => connection
.getConnection()
.then((db) => db.collection('products').insertOne({ name, quantity }))
.then((result) => result.ops[0]);

const getAllProducts = async () => connection
.getConnection()
.then((db) =>
  db.collection('products').find().toArray());

module.exports = {
  createProduct,
  productExists,
  getAllProducts,
};