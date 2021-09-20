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

const saleExists = async (id) => {
  const db = await connection();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });

  return sale !== null;
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

const update = async (id, sale) => {
  const testeID = ObjectId.isValid(id);

  if (!testeID) {
    return null;
  }
  const db = await connection();
  const product = await db.collection('sales').updateOne(
    { _id: ObjectId(id) }, { $set: { itensSold: sale } },
  );

  if (product.modifiedCount === 1) {
    return true;
  }

  return false;
};

const remove = async (id) => {
  const db = await connection();

  const deletedSale = await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  console.log(deletedSale);

  return deletedSale;
};

module.exports = {
  productExists,
  saleExists,
  getAll,
  getById,
  create,
  update,
  remove,
};
