const mongoConnection = require('./connection');

const createSale = async (arr) => {
  const db = await mongoConnection();
  const newSale = await db.collection('sales')
  .insertOne({ itensSold: arr });
  return newSale.ops[0];
};

module.exports = {
  createSale,
};