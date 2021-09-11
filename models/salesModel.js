const { ObjectId } = require('mongodb');
const connection = require('./connection');

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
  getById,
  getAll,
};