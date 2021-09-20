const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (sales) => {
  const db = await connection();
  const { insertedId } = await db.collection('sales').insertOne({ itensSold: sales });

  return {
    _id: insertedId,
    itensSold: sales,
  };
};

const getAll = async () => {
  const db = await connection();
  
  return db.collection('sales').find().toArray();
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();

  return db.collection('sales').findOne(ObjectId(id));
};

const update = async (id, data) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();

  await db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold: data } });

  return findById(id);
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const sale = await findById(id);
  const db = await connection();

  await db.collection('sales').deleteOne({ _id: ObjectId(id) });

  return sale;
};

module.exports = {
  create,
  findById,
  getAll,
  update,
  remove,
};