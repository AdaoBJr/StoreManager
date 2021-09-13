const connection = require('./connection');

const addSale = async (itensSold) => {
  const add = await connection()
      .then((db) => db.collection('sales').insertOne({ itensSold }));
  return add.ops[0];
};

module.exports = {
  addSale,
};