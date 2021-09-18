const { ObjectId } = require('mongodb');
const connection = require('./connection');

const saleIdExists = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });

  // return sale !== null;
  if (sale !== null) return sale;
};

const getAll = async () => {
  const db = await connection();
  return db.collection('sales').find().toArray();
};

const create = async (itensSold) => {
  const db = await connection();
  const createdSaleResult = await db.collection('sales').insertOne({ itensSold });

  return { _id: createdSaleResult.insertedId, itensSold };
};

const update = async ({ id, itensSold }) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();

  const sale = await db.collection('sales').updateOne(
    { _id: ObjectId(id) }, { $set: { itensSold } },
  );
    return sale;
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();

  return db.collection('sales').deleteOne({ _id: ObjectId(id) });
};

module.exports = { getAll, create, update, exclude, saleIdExists };