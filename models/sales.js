const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSales = async (sales) => {
  const db = await connection();
  const insert = await db.collection('sales').insertMany(sales);
  return insert;
};

const getById = async (id) => {
  const db = await connection();
  const sale = await db.collection('sales').findOne({
    _id: ObjectId(id),
  });
  return sale;
};

const getAllSales = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();
  return sales;
};

module.exports = {
  createSales,
  getById,
  getAllSales,
};
