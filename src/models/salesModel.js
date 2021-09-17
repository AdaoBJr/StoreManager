const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addSale = async (saleArray) => connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: saleArray }))
      .then((result) => ({ _id: result.insertedId, itensSold: saleArray }));

const getAllSales = async () => connection()
  .then((db) => db.collection('sales').find().toArray());

const getSaleById = async (id) => connection()
  .then((db) => db.collection('sales').findOne(ObjectId(id)));

const updateSaleById = async (id, productIdAndquantity) => connection()
.then((db) => db.collection('sales')
  .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: productIdAndquantity } }))
    .then(() => ({ _id: id, itensSold: productIdAndquantity }));

module.exports = { addSale, getAllSales, getSaleById, updateSaleById };
