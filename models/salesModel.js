const { ObjectId } = require('mongodb');
const connection = require('./connection');

async function create(sales) {
  const db = await connection();
  const createdSales = await db.collection('sales').insertOne({ itensSold: sales });
  
  return createdSales.ops[0];
}

async function getAll() {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();

  return sales;
}

async function getById(id) {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const sale = await db.collection('sales').findOne(ObjectId(id));

  return sale;
}

async function update(id, itensSold) {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  await db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });

  return { _id: id, itensSold };
}

async function exclude(id) {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
}

async function updateInventory(id, quantity) {
  const db = await connection();
  await db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $inc: { quantity } });
}

module.exports = {
  create,
  getById,
  getAll,
  update,
  exclude,
  updateInventory,
};