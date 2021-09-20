const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSale = async (sales) => 
  connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sales }));

const getAllSales = async () => 
  connection()
    .then((db) => db.collection('sales').find().toArray());

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)));
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};