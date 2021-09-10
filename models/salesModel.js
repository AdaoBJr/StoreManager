const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (product) => {
  const sale = await connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: [...product] }));

  return sale.ops[0];
};

const getAll = async () => {
  const product = await connection()
  .then((db) => db.collection('sales').find({}).toArray());

  return product;
};

const getById = async (id) => {
  const sale = await connection()
  .then((db) => db.collection('sales').findOne({ _id: new ObjectId(id) }));

  return sale;
};

const update = async (id, product) => {
  const sale = await connection()
  .then((db) => db.collection('sales')
    .updateOne({ _id: new ObjectId(id) }, { $set: { itensSold: product } }));
  
  const salesName = await connection()
  .then((db) => db.collection('sales').findOne({ _id: new ObjectId(id) }));

  return sale && salesName;
};

const excluse = async (id) => {
  const sale = await connection()
    .then((db) => db.collection('sales').deleteOne({ _id: new ObjectId(id) }));

  return sale;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  excluse,
};