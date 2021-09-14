const connect = require('./connection');

const getAll = async () => {
  const db = await connect.connection();
  const allProducts = await db.collection('products').find().toArray();
  console.log(allProducts);
  return allProducts;  
};

const productExists = async ({ name }) => {
  const db = await connect.connection();
  const product = await db.collection('products').findOne({ name });
  return product;
};

const create = async ({ name, quantity }) => {
  const db = await connect.connection();
  const product = await db.collection('products').insertOne({ name, quantity });
  return {
    _id: product.insertedId,
    name,
    quantity,
  };
};

module.exports = { getAll, productExists, create };