// const connection = require('./connection');
const mongoConnection = require('./connection');
// const { ObjectId } = require('mongodb');

const createProduct = async (name, quantity) => {
  const db = await mongoConnection.connection();
  const { insertedId: id } = await db.collection('products').insertOne({ name, quantity });
  return { 
    id,
    name,
    quantity };
};

const findProductByName = async (name) => {
  const db = await mongoConnection.connection();
  const registeredProduct = db.collection('products').findOne({ name });
  return registeredProduct;
};

// const getAll = async () => {
//   const db = await mongoConnection.connection();
//   const resultQuery = await db.collection('products').findMany().toArray();
 
//   return resultQuery;
// };

module.exports = {
  createProduct,
  findProductByName,
  // getAll,
};