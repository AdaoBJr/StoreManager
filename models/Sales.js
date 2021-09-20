const { connection } = require('./connection');

const createSale = async (itensSold) => {
  const sale = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }));
  // console.log({ _id: sale.insertedId, itensSold });
  return { _id: sale.insertedId, itensSold };
};

module.exports = {
  createSale,
};