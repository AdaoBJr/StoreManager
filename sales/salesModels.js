const { ObjectId } = require('mongodb');
const connection = require('../connections/mongoDBConnection');

const productExists = async (sales) => {
  const db = await connection();

  const product = await db.collection('products').findOne({ _id: ObjectId(sales.id) });

  return product;
};

const getAll = async () => {
  const db = await connection();

  const sales = await db.collection('sales').find().toArray();
  return sales;
};

const getById = async (id) => {
  const db = await connection();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });

  return sale;
};

const create = async (sale) => {
  const db = connection();

  const newSale = db.collection('sales').insertOne({ itensSold: sale });

  return { _id: newSale.insertedId, newSale };
};

const update = (_id) => {};

const remove = (_id) => {};

module.exports = {
  getAll,
  productExists,
  getById,
  create,
  update,
  remove,
};
