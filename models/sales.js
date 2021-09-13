const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const createSales = async (sales) => {
  const db = await connection();
  const insert = await db.collection('sales').insertMany(sales);
  return insert;
};

const getById = async (id) => {
  const db = await connection();
  const sale = await db.collection('sales').findOne({
    _id: ObjectId(id),
  });
  return sale;
};

const getAllSales = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();
  return sales;
};

const editSale = async (id, newSales) => {
  const db = await connection();
  const sales = await db.collection('sales').updateOne({
    _id: ObjectId(id),
  },
  {
    $set: {
      itensSold: newSales,
    },
  });
  return sales;
};

const deleteSale = async (id) => {
  const db = await connection();
  await db.collection('sales').deleteOne({
    _id: ObjectId(id),
  });
};

const dropSales = async () => {
  const db = await connection();
  await db.collection('sales').deleteMany({});
};

module.exports = {
  createSales,
  getById,
  getAllSales,
  editSale,
  deleteSale,
  dropSales,
};
