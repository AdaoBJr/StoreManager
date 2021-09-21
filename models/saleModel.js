const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSale = async (items) => {
  const db = await connection();
  const newSale = await db.collection('sales').insertOne({ itensSold: items });

  return newSale.ops[0];
};

const getAll = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();

  return sales;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const sale = await db.collection('sales').findOne(ObjectId(id));

  if (!sale) return null;

  return sale;
};

const updateSale = async (id, item) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const updatedSale = await db.collection('sales')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { itensSold: item } },
      { returnOriginal: false },
    );

  if (!updatedSale) return null;

  return updatedSale.value;
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const deletedSale = await getById(id);
  const db = await connection();
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });

  return deletedSale;
};

module.exports = {
  createSale,
  getAll,
  getById,
  updateSale,
  deleteSale,
};
