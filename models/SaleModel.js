// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (sale) => {
  const db = await connection();
  const saleAdd = await db.collection('sales').insertOne({ itensSold: sale });

  return saleAdd.ops[0];
};

module.exports = { create };
