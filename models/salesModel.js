const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSale = async (newSale) => {
  const result = await connection.getConnection().then((db) =>
    db.collection('sales').insertOne({ itensSold: newSale }));

  return { _id: result.insertedId, itensSold: newSale };
};

const getAllSales = async () => {
  const result = await connection.getConnection().then((db) =>

  db.collection('sales').find().toArray());

  return result;
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const result = await connection.getConnection().then((db) =>
    db.collection('sales').find({ _id: ObjectId(id) }).toArray());

  return result[0];
};

const updateSaleById = async (id, saleProductsList) => {
  if (!ObjectId.isValid(id)) return null;

  await connection.getConnection().then((db) => db.collection('sales')
    .update({ _id: ObjectId(id) }, { $set: { itensSold: saleProductsList } }));

  return { _id: id, itensSold: saleProductsList };
};

const excludeSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const result = await connection.getConnection().then((db) =>
    db.collection('sales').deleteOne({ _id: ObjectId(id) }));

  return result;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSaleById,
  excludeSaleById,
};
