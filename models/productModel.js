const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async ({ name, quantity }) => {
  const db = await connection();
  let result = await db.collection('products').findOne({ name });
  if (!result) {
    result = await db.collection('products').insertOne({ name, quantity });
    return { _id: result.insertedId,
      name,
      quantity,
    };
  }
  return { err: {
    code: 'invalid_data',
    message: 'Product already exists',
  } };
};

const getAll = async () => {
  const db = await connection();
  return db.collection('products').find().toArray();
};

const getById = async (id) => {
  const db = await connection();
  return db.collection('products').findOne(ObjectId(id));
};

const update = async ({ name, quantity, id }) => {
  const db = await connection();
  let result = await db.collection('products').findOne({ _id: ObjectId(id) });
  console.log(id);
  if (result === null) {
    return { err: {
      code: 'invalid_data',
      message: 'Product does not exist',
    } };
  }
  result = await db.collection('products').updateOne({
    _id: ObjectId(id) },
    { $set: { name, quantity } });
  return {
    id,
    name,
    quantity,
  };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
