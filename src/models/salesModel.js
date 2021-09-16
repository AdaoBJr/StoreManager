const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addSale = async (saleArray) => connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: saleArray }))
      .then((result) => ({ _id: result.insertedId, itensSold: saleArray }));

const getAllSales = async () => connection()
  .then((db) => db.collection('sales').find().toArray());

const getSaleById = async (id) => connection()
  .then((db) => db.collection('products').findOne(ObjectId(id)));

module.exports = { addSale, getAllSales, getSaleById };
