// const { ObjectId } = require('mongodb');
const connection = require('./mongoConnection');

const newSales = async (result) => {
  const db = await connection();
  const venda = await db.collection('sales').insertOne({ itensSold: result });
  const { insertedId } = venda;
  const xablau = JSON.parse(venda);
  return { _id: insertedId, itensSold: xablau.ops[0].itensSold };
};

module.exports = { newSales };
