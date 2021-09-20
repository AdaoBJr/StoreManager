const { ObjectId } = require('mongodb');
const connection = require('./connection');

const newProduct = async ({ name, quantity }) => {
  const db = await connection();
  const product = await db.collection('products').insertOne({ name, quantity });
  const { insertedId } = JSON.parse(product);
  return { _id: insertedId, name, quantity };
};

const findProduct = async () => {
  const db = await connection();
  const find = await db.collection('products').find().toArray();
  return find;
};

const findOneProduct = async (id) => {
  const db = await connection();
  const findOne = await db.collection('products').findOne(ObjectId(id));

  if (!findOne) {
    return { status: 422, err: { code: 'invalid_data', message: 'Wrong id format' } };
  }

  return { status: 200, findOne };
};

module.exports = {
  newProduct,
  findProduct,
  findOneProduct,
};
