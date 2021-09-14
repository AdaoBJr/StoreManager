const { ObjectId } = require('mongodb');
const getConnection = require('./connection');
// const getAll = require('./modelProducts');

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const sales = getConnection()
  .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
  return sales;
};

const getAll = async () => getConnection()
  .then((db) => db.collection('sales').find().toArray());

const create = async (sales) => {
  const db = await getConnection();
  // const allProducts = await getAll();
  
  const salesMade = await db.collection('sales').insertOne(sales);
  return salesMade;
};

module.exports = { create, getAll, getById };
