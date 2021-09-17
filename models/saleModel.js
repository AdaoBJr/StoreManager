const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  return db.collection('sales').find().toArray();
};

const getOne = async (id) => {
  const db = await connection();
  return db.collection('sales').findOne({ _id: ObjectId(id) });
};

const add = async (productsList) => {
  const db = await connection();
  const sales = await db.collection('sales')
    .insertOne({ itensSold: productsList });
  return { _id: sales.insertedId, itensSold: productsList };
};

module.exports = {

  add,
  getAll,
  getOne,

};