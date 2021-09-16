const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSale = async (array) => {
  const data = await connection().then((db) => db.collection('sales'));
  const create = await data.insertOne({ itensSold: array });
  return create;
};

const getAll = async () => {
  const data = await connection().then((db) => db.collection('sales'));
  const findAll = await data.find().toArray();
  return findAll;
};

const getById = async (id) => {
  const data = await connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
  return data;
};

const updateId = async (id, sale) => {
  const data = await connection().then((db) => db.collection('sales')
    .update({ _id: ObjectId(id) }, { $set: { itensSold: sale } })).then((
    ) => ({ _id: id, itensSold: sale }));
  return data;
};

const deleteId = async (id) => {
  const data = await connection().then((db) => db.collection('sales')
  .deleteOne({ _id: ObjectId(id) }));
  return data;
};

module.exports = {
  createSale,
  getAll,
  updateId,
  deleteId,
  getById,
};