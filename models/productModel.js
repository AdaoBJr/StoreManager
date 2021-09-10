const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createProd = async (name, quantity) => {
  const { insertedId } = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }));

  return {
    _id: insertedId,
    name,
    quantity,
  };
};

const getAllProds = async () => {
  const result = await connection()
    .then((db) => db.collection('products').find().toArray());

  return {
    products: result,
  };
};
