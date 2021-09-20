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

const updateSale = async (id, sales) => {
  connection()
    .then((db) => db.collection('sales').updateOne(
      { _id: ObjectId(id) },
      { $set: {
        itensSold: sales,
      } },
    ));

  return { _id: id, itensSold: sales };
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
};