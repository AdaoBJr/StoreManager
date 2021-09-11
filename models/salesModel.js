const connection = require('./connection');

const includeSales = async (sales) => {
  const db = await connection();
  const insertedSales = await db.collection('sales').insertOne({ itensSold: sales });
  
  return insertedSales.ops[0];
};

module.exports = {
  includeSales,
};