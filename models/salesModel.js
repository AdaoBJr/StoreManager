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

  const db = connection();
  const sale = await db.collection('sales').findOne(ObjectId(id));

  return sale;
}

module.exports = {
  create,
  getById,
  getAll,
};