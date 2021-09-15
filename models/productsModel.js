const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createProd = async ({ name, quantity }) => {
  const db = await connection();
  const product = await db.collection('products').insertOne({ name, quantity });
  const { insertedId } = JSON.parse(product);
  return { _id: insertedId, name, quantity };
};
const getAllProd = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();
  return products;
};
const deleteProd = async ({ id }) => {
  const db = await connection();
  const products = await db.collection('products').deleteOne({ _id: ObjectId(id) });
  return products;
};
const getProdId = async (id) => {
  const db = await connection();
  const product = await db.collection('products').findOne(ObjectId(id));
  if (product) return { status: 200, product };
  return {
    status: 422, err: { code: 'invalid_data', message: 'Wrong id format' }
  };
};
const updateProd = async ({ id, name, quantity }) => {
  const db = await connection();
  const product = await db.collection('products').updateOne({ _id: ObjectId(id) },
    { $set: { name, quantity } });
  return product;
};

module.exports = { createProd, getAllProd, deleteProd, getProdId, updateProd };
