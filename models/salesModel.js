const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const createSale = async (arr) => {
  const db = await mongoConnection();
  const newSale = await db.collection('sales')
  .insertOne({ itensSold: arr });
  return newSale.ops[0];
};

const getAllSales = async () => {
  const db = await mongoConnection();
  const allSales = await db.collection('sales').find().toArray();
  return { sales: allSales };
};

const getSaleById = async (id) => {
  const db = await mongoConnection();
  const sale = await db.collection('sales').findOne(ObjectId(id));
  return { sale };
};

const updateSaleById = async (id, arr) => {
  const db = await mongoConnection();
  console.log(arr);
  await db.collection('sales')
  .updateOne(({ _id: ObjectId(id) }), { $set: { itensSold: arr } });
  return { itensSold: arr, _id: id };
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSaleById,
};