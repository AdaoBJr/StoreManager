const connection = require('./connection');

const createSales = async (arr) => {
  const db = await connection();
  const addSales = await db.collection('sales').insertOne({ itensSold: arr });
  return { _id: addSales.insertedId, itensSold: arr };
};

module.exports = {
  createSales,
};