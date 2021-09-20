const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addSale = async (newSale) => {
  const db = await connection.getConnection();
  const createSaleResult = await db.collection('sales').insertOne({ itensSold: newSale });

  return { _id: createSaleResult.insertedId, itensSold: newSale };
};

const getAllSales = async () => {
  const db = await connection.getConnection();
  const sales = await db.collection('sales').find().toArray();

  return { sales };
};

const getSalesById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection.getConnection();
  const getByIdResult = await db.collection('sales').find({ _id: ObjectId(id) }).toArray();

  return getByIdResult;
};

module.exports = { 
  addSale,
  getAllSales,
  getSalesById,
 };