const { ObjectId } = require('mongodb');

const connection = require('./connection');

const includeSales = async (sales) => {
  const db = await connection();
  const insertedSales = await db.collection('sales').insertOne({ itensSold: sales });
  
  return insertedSales.ops[0];
};

const getAllSales = async () => {
  const db = await connection();
  return db.collection('sales').find().toArray();
};

const findById = async (id) => {
  const db = await connection();
  const sale = await db.collection('sales').findOne(ObjectId(id));
  return sale;
};

const isValidId = async (id) => ObjectId.isValid(id);

const saleExists = async (id) => {
  const db = await connection();
  const wasFound = await db.collection('sales').findOne({ _id: id });

  return wasFound !== null;
};

module.exports = {
  includeSales,
  getAllSales,
  findById,
  saleExists,
  isValidId,
};