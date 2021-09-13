// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const modelCreate = async (itensSold) => {
  const db = await connection();
  const sales = await db.collection('sales').insertOne({ itensSold });
return { code: 200, itensSold: { _id: sales.insertedId, itensSold } };
};

module.exports = {
  modelCreate,
};