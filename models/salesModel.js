const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSales = async (sales) => {
  const db = await connection();
  const createdSaleResult = await db
    .collection('sales')
    .insertOne({ itensSold: sales });

  return { _id: createdSaleResult.insertedId, itensSold: sales };
};

const getAll = async () => {
  const db = await connection();
  return db.collection('sales').find().toArray();
};

const getOne = async (id) => {
  const db = await connection();
  return db.collection('sales').findOne({ _id: ObjectId(id) });
};

const updateSaleById = async (sale, id) => {
  await connection().then((db) =>
    db
      .collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sale } }));

  return { _id: id, itensSold: sale };
};

const deleteSaleById = async (id) => {
  const result = await connection().then((db) =>
    db.collection('sales').findOne({ _id: ObjectId(id) }));

  await connection().then((db) =>
    db.collection('sales').deleteOne({ _id: ObjectId(id) }));

  return result;
};

module.exports = {
  createSales,
  getAll,
  getOne,
  updateSaleById,
  deleteSaleById,
};
