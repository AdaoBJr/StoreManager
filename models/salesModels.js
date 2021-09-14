const { array } = require('joi');
const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const createSale = async (body) => {
  const db = await mongoConnection.connection();
  const { insertedId: id } = await db.collection('sales')
    .insertOne({ itensSold: [...body] });

  return {
    _id: id,
    itensSold: [...body],
  };
};

const getAll = async () => {
  const db = await mongoConnection.connection();
  const arrayDates = await db.collection('sales').find().toArray();
  return { sales: arrayDates };
};

const getSalesById = async (id) => {
  const db = await mongoConnection.connection();
  const resultQuery = await db.collection('sales').findOne(ObjectId(id));
  return resultQuery;
};

const update = async ({ id, arrayBody: { productId, quantity } }) => {
  const db = await mongoConnection.connection();
  await db.collection('sales').updateOne(
    { _id: ObjectId(id) },
    { $set: { itensSold: [productId, quantity] } },
  );
  
  return {
    _id: id,
    itensSold: [{ productId, quantity }],
  };
};
module.exports = {
  createSale,
  getSalesById,
  getAll,
  // getById,
  update,
  // exclude,
};