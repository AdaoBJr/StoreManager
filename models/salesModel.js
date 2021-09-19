const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();
  return { sales };
};

const saleById = async (id) => {
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

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const deletedSale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return deletedSale;
};

module.exports = { getAll, saleById, create, update, exclude };
