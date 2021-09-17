// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addSale = async (newSale) => {
  const db = await connection.getConnection();
  const createSaleResult = await db.collection('sales').insertOne({ itensSold: newSale });

  return { _id: createSaleResult.insertedId, itensSold: newSale };
};

module.exports = { 
  addSale,
 };