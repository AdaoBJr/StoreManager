const connection = require('./connection');

const create = async (sales) => {
  const db = await connection();
  const createSale = await db.collection('sales').insertOne({ itensSold: sales });
  return {
    _id: createSale.insertedId,
    itensSold: sales,
  };
};

module.exports = {
  create,
};