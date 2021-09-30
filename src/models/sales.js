const { ObjectId } = require('mongodb');
const connection = require('../../connection');

const getAll = async () => {
  const db = await connection();

  const sales = await db.collection('sales').find().toArray();

  return sales;
};

const getById = async (id) => {
  const db = await connection();

  if (!ObjectId(id)) return null;

  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });

  return sale;
};

const create = async () => {
  const db = await connection();

  const newSale = await db.collection('sales').create();

  return newSale;
};

const update = async (id) => {
  const db = await connection();

  if (!ObjectId(id)) return null;

  const updatedSale = await db.collection('sales')
    .updateOne({ _id: ObjectId(id) });

  return updatedSale;
};

const remove = async (id) => {
  const db = await connection();

  if (!ObjectId(id)) return null;

  const deletedSale = await db.collection('sales').deleteOne({ _id: ObjectId(id) });

  return deletedSale;
};

module.exports = { getAll, getById, create, update, remove };
