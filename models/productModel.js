const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllProds = async () => {
  const result = await connection()
    .then((db) => db.collection('products').find().toArray());

  return {
    products: result,
  };
};
