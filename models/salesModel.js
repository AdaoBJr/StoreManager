const { ObjectId } = require('mongodb');
const mongoConnect = require('./connection');

const create = async ({ itensSold }) => {
  const salesCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('sales'));

  const { insertedId: id } = await salesCollection
    .insertOne({ itensSold });

  return { id };
};

const getAll = async () => {
  const salesCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('sales'));

  const sales = await salesCollection
    .find().toArray();

  return { sales };
};

const findById = async ({ id }) => {
  const salesCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('sales'));    

  const sale = await salesCollection
    .findOne(new ObjectId(id));
  
    return { sale };
};

module.exports = {
  create,
  getAll,
  findById,
};