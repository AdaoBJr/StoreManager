const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (itensSold) => {
  const db = await connection();
  const newSale = await db.collection('sales').insertOne({ itensSold });
  return { _id: newSale.insertedId, itensSold };
};

const getAll = async () => {
  const db = await connection();
  const allSales = await db.collection('sales').find().toArray();
  return allSales;
};

const getById = async (id) => {
  const db = await connection();
  return db.collection('sales').findOne(ObjectId(id));
};

const update = async (id, updates) => {
  const db = await connection();
  const { matchedCount } = await db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: updates } });
  if (matchedCount) {
    const sale = await getById(id);
    return sale;
  }
};

const exclude = async (id) => {
  const db = await connection();
  const { deletedCount } = await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return deletedCount;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};
