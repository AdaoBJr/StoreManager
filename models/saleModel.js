// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (sale) => {
  const db = await connection();
  const createdSale = await db.collection('sales')
    .insertOne({ itensSold: sale });

  return createdSale.ops[0];
};

module.exports = {
  create,
};