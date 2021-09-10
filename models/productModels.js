// const connection = require('./connection');
const mongoConnection = require('./connection');
// const { ObjectId } = require('mongodb');

const createProduct = async (name, quantity) => {
  const db = await mongoConnection.connection();
  const consultExistProduct = await db.collection('products').findOne({ name });

  if (consultExistProduct) {
    return { 
      err: { code: 'invalid_data', message: 'Product already exists' } }; 
  }

  const { insertedId } = await db.collection('products').insertOne({ name, quantity });

  return { id: insertedId, name, quantity };
};

module.exports = {
  createProduct,
};