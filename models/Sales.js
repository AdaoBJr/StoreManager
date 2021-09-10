const connection = require('./connection');

const create = async (sales) => {
  const db = await connection();
  const { insertedId } = await db.collection('sales').insertOne({ itensSold: sales });
  return {
    _id: insertedId,
    itensSold: sales,
  };
};

module.exports = {
  create,
};
