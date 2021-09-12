const connection = require('./connection');

const registerSale = async (itemsSold) => {
  const db = await connection();
  const result = await db.collection('sales').insertOne({ itemsSold });
  return result;
};

module.exports = { registerSale };
