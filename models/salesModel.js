const connection = require('./connection');

const registerSale = async (itensSold) => {
  const db = await connection();
  const insertedSale = await db.collection('sales').insertOne({ itensSold });
  return insertedSale.ops[0];
};

module.exports = { registerSale };
