const { ObjectId } = require('mongodb');
const CustomError = require('../helpers/CustomError');
const mongoConnection = require('./connection');

const getConnectionWithSalesCollection = async () => {
  const connnectionWithSalesCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('sales'));

  return connnectionWithSalesCollection;
};

const create = async (itensSold) => {
  const salesCollection = await getConnectionWithSalesCollection();
  
  const { insertedId: _id } = await salesCollection
    .insertOne({ itensSold });
  
  return {
    _id,
    itensSold,
  };
};

const findAll = async () => {
  const salesCollection = await getConnectionWithSalesCollection();
  const sales = await salesCollection.find().toArray();

  return sales;
};

const findById = async ({ id }) => {
  try {
    const salesCollection = await getConnectionWithSalesCollection();
  
    const sale = salesCollection.findOne(new ObjectId(id));
  
    return sale;
  } catch (err) {
    throw new CustomError('not_found', 'Sale not found', 404);
  }
};

module.exports = { create, findAll, findById };