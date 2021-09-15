const { ObjectId } = require('mongodb');
const getConnection = require('./connection');
// const getAll = require('./modelProducts');

const update = async (id, updateSales) => {
  const db = await getConnection();
  const sales = await db.collection('sales').updateOne(
    { _id: ObjectId(id) },
    { $set: { itensSold: updateSales } },
  );

  return sales;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  
  const sales = await getConnection()
  .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
  // console.log(sales, 'sales');
  return sales;
};

const getAll = async () => getConnection()
  .then((db) => db.collection('sales').find().toArray());

const create = async (sales) => {
  const db = await getConnection();
  
  const salesMade = await db.collection('sales').insertOne(sales);

  return salesMade;
};

module.exports = { create, getAll, getById, update };
