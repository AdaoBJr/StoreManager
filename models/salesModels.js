const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const createSale = async (body) => {
  const db = await mongoConnection.getConnection();
  const sales = await db.collection('sales').insertOne({ itensSold: body });
  console.log(sales);
  return {
    _id: sales.insertedId,
    itensSold: body,
  };
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await mongoConnection.getConnection();
  const sales = await db.collection('sales').findOne({ _id: ObjectId(id) });
  console.log(sales);
  return sales;
};

const getSales = async () => {
  const db = await mongoConnection.getConnection();
  const sales = await db.collection('sales')
    .find()
    .toArray();
    return { sales };
};

module.exports = { 
  createSale,
  getSaleById,
  getSales,
 };
