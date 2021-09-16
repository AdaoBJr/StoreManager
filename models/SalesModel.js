const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllSales = async () => {
  const db = await connection();
  const salesAll = await db.collection('sales').find().toArray();
  return { sales: salesAll };
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const saleId = await db.collection('sales').findOne(new ObjectId(id));
  if (!saleId) return null;
  return saleId;
};

const createSales = async (arr) => {
  const db = await connection();
  const addSales = await db.collection('sales').insertOne({ itensSold: arr });
  return { _id: addSales.insertedId, itensSold: arr };
};

module.exports = {
  createSales,
  getAllSales,
  findById,
};