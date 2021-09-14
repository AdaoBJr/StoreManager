const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');
// const productModel = require('./productsModel');

const create = async (body) => {
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('sales'));
  const { insertedId: id } = await productsCollection.insertOne({ itensSold: [...body] });
  return { _id: id, itensSold: [...body] };
};

const getAll = async () => {
  const db = await mongoConnection.getConnection();
  const sale = await db.collection('sales').find().toArray();
  return sale;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await mongoConnection.getConnection();
  const saleId = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return saleId;
};

const update = async (idParams, body) => {
  if (!ObjectId.isValid(idParams)) return null;
  const db = await mongoConnection.getConnection();
  await db.collection('sales').updateOne({ _id: ObjectId(idParams) },
    { $set: { itensSold: body } });
  return { _id: idParams, itensSold: body };  
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
