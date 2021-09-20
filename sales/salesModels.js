const { ObjectId } = require('mongodb');
const connection = require('../connections/mongoDBConnection');

const productExists = async (sales) => {
  const db = await connection();

  const arrayValidates = await sales.map(async (curr) => {
    const product = await db.collection('products').findOne({ _id: ObjectId(curr.productId) });

    return product;
  });

  return Promise.all(arrayValidates).then((response) => response);
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

const create = async (sales) => {
  const db = await connection();

  const newSales = await db.collection('sales').insertOne({ itensSold: sales });

  return newSales.ops;
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
