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

const deleteSale = async (id) => 
  connection()
    .then((db) => db.collection('sales').deleteOne(
      { _id: ObjectId(id) },
    ));

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};