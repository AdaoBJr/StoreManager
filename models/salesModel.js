const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addSale = async (itensSold) => {
  const add = await connection()
      .then((db) => db.collection('sales').insertOne({ itensSold }));
  return add.ops[0];
};

const findAll = async () => {
  const find = await connection().then((db) => db.collection('sales').find().toArray());
  return find;
};

const findById = async (id) => ObjectId.isValid(id)
  && connection().then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));

const updateSale = async (id, itensSold) => {
  const update = await connection().then((db) =>
  db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }));
  console.log(update);
  return { _id: id, itensSold };
};
module.exports = {
  addSale,
  findAll,
  findById,
  updateSale,
};