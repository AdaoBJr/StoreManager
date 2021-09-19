const { ObjectId } = require('mongodb');
const connection = require('./connection');

const insertNewSales = async (products) => {
  const db = await connection();

  const { insertedId } = await db.collection('sales').insertOne({ itensSold: products });

  return { _id: insertedId, itensSold: products };
};

const getAllSalesList = async () => {
  const db = await connection();

  const salesList = await db.collection('sales').find().toArray();

  return salesList;
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();

  return db.collection('sales').findOne(ObjectId(id));
};

const update = async (id, productId, quantity) => {
  const db = await connection();

  const { itensSold } = await getSaleById(id);

  itensSold.forEach((item, index) => {
    if (item.productId === productId[index]) {
      itensSold[index].quantity = quantity[index];
    }
  });

  await db.collection('sales').updateOne(
    { _id: ObjectId(id) },
    { $set: { itensSold } },
  );

  return { _id: ObjectId(id), itensSold };
};

const deleteSaleById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();

  const { _id, name, quantity } = await db.collection('sales').findOne(ObjectId(id));

  await db.collection('sales').deleteOne({ _id: ObjectId(id) });

  return { _id, name, quantity };
};

module.exports = {
  getAllSalesList,
  getSaleById,
  deleteSaleById,
  insertNewSales,
  update,
};
