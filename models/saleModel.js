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

const update = async (id, sale) => {
  const data = await connection().then((db) => db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: sale }));
  console.log(data);
  return data;
};

module.exports = {
  createSale,
  getAll,
  update,
  getById,
};