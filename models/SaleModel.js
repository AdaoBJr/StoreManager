const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findAll = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();

  return sales;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return false;
  const db = await connection();
  const sale = await db.collection('sales').findOne(ObjectId(id));

  return sale;
};

const create = async (sale) => {
  const db = await connection();
  const saleAdd = await db.collection('sales').insertOne({ itensSold: sale });

  return saleAdd.ops[0];
};

const update = async (id, sale) => {
  const db = await connection();
  await db
    .collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sale } });

  const saleUpdated = await findById(id);

  if (!saleUpdated) return false;

  return saleUpdated;
};

module.exports = { create, findAll, findById, update };
