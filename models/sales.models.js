const connection = require('./connection');

const create = async (itensSold) => {
  const db = await connection();
  const newSale = await db.collection('sales').insertOne({ itensSold });
  return { _id: newSale.insertedId, itensSold };
};

module.exports = { create };
