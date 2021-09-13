const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const createSale = async (body) => {
  const db = await mongoConnection.getConnection();
  const sales = await db.collection('sales').insertOne({ itensSold: body });
  return {
    _id: sales.insertedId,
    itensSold: body,
  };
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await mongoConnection.getConnection();
  const sales = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return sales;
};

const getSales = async () => {
  const db = await mongoConnection.getConnection();
  const sales = await db.collection('sales')
    .find()
    .toArray();
    return { sales };
};

const updateSaleId = async (id, body) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await mongoConnection.getConnection();
  await db.collection('sales')
  .updateOne({ _id: ObjectId(id) }, 
  { $set: { body } });
  return {
    _id: id,
    itensSold: body,
  }; 
};

const deleteSaleId = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await mongoConnection.getConnection();
  const deleteSale = await db.collection('sales')
  .findOneAndDelete({ _id: ObjectId(id) });
  return deleteSale.value;
};

module.exports = { 
  createSale,
  getSaleById,
  getSales,
  updateSaleId,
  deleteSaleId,
 };
