const { ObjectId } = require('mongodb');
const connection = require('./connection');

const productExists = async ({ name }) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });

  return await product !== null;
};

const getAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();

  if (!products) return false;

  return products;
};

const getById = async (id) => {
  const db = await connection();
  const product = await db.collection('products').findOne(ObjectId(id));
  return product;
};

const update = async ({ id, name, quantity }) => {
  const db = await connection();
  await db.collection('products').updateOne(
    { _id: ObjectId(id) }, { $set: { name, quantity } },
  );
  return { _id: id, name, quantity };
};

const create = async ({ name, quantity }) => {
  const db = await connection();
  const createdProductResult = await db.collection('products').insertOne({ name, quantity });

  return { _id: createdProductResult.insertedId, name, quantity };
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  return db.collection('products').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  create,
  productExists,
  getAll,
  getById,
  update,
  exclude,
};