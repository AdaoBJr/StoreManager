const { ObjectId } = require('mongodb');
const connection = require('../connection');

const getName = async (name) => {
  const auxConnection = await connection();
  const result = await auxConnection.collection('products').findOne({ name });
  return result;
};

const insertOne = async (name, quantity) => {
  const auxConnection = await connection();
  const result = await auxConnection.collection('products')
  .insertOne({ name, quantity });
  return result;
};

const getAll = async () => {
  const auxConnection = await connection();
  const result = await auxConnection.collection('products').find().toArray();
  return { products: result };
};

const getId = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const auxConnection = await connection();
  const result = await auxConnection.collection('products').findOne(ObjectId(id));
  return result;
};

const updateOne = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const auxConnection = await connection();
  await auxConnection.collection('products')
  .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
};

const deleteOne = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const auxConnection = await connection();
  const auxGetId = await getId(id);
  console.log(auxGetId);
  await auxConnection.collection('products')
  .deleteOne({ _id: ObjectId(id) });
  if (auxGetId) {
    return auxGetId;
  }
  return null;
};

module.exports = { getName, insertOne, getAll, getId, updateOne, deleteOne };
