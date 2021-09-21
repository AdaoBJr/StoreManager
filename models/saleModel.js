const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

// req 5
const registerSale = async (body) => {
  const db = await connection();
  const { insertedId: id } = await db.collection('sales').insertOne({ itensSold: [...body] });
  return { _id: id, itensSold: [...body] };
};

// req 6
const findAllSales = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();
  return sales;
};

// req 6
const findSaleById = async (id) => {
  const db = await connection();
  const saleById = await db.collection('sales').findOne(ObjectId(id));
  return saleById;
};

// req 7
const updateSale = async (id, body) => {
  const db = await connection();
  await db.collection('sales').updateOne({ _id: ObjectId(id) },
  { $set: { itensSold: body } });
  return { _id: id, itensSold: body };
};

// req 8
const deleteSale = async (id) => {
  const db = await connection();
  const deleted = await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return deleted;
};

module.exports = {
  registerSale,
  findAllSales,
  findSaleById,
  updateSale,
  deleteSale,
};
