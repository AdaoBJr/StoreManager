const { ObjectId } = require('mongodb');
const connection = require('./connection');

const saleExists = async (id) => {
  const db = await connection();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });

  return sale !== null;
};

const getAll = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();
  return { sales };
};

const saleById = async (id) => {
  const exists = await saleExists(id);
  if (!exists) return null;
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const saleObj = await db.collection('sales').findOne({ _id: ObjectId(id) });

  return saleObj;
};

const create = async (itensSold) => {
  const db = await connection();
  const createdSaleResult = await db.collection('sales').insertOne({ itensSold });

  return { _id: createdSaleResult.insertedId, itensSold };
};

const update = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();

  await db.collection('sales').updateOne(
      { _id: ObjectId(id) }, { $set: itensSold },
  );
      
  return { _id: id, itensSold: [itensSold] };
};

module.exports = { getAll, saleById, create, saleExists, update };
