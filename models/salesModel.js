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

const update = async (id, body) => {
  if (!ObjectId.isValid(id)) return null;
  const { itensSold } = await getById(id);
  const db = await mongoConnection.getConnection();
  await db.collection('sales').updateOne({ _id: ObjectId(id) }, 
  { $set: { itensSold: [...itensSold, body] } });
  return { _id: id, itensSold: body };  
};

const exclude = async (id) => {
  console.log(id);
  if (!ObjectId.isValid(id)) return null;
  const db = await mongoConnection.getConnection();
  const saleDel = await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  console.log(saleDel);
  return saleDel;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};
