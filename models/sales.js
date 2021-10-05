// const { ObjectId } = require('mongodb');

const connection = require('./connection');

module.exports = {

  createSales: (sales) => (
    connection().then((db) => db.collection('sales').insertOne({ itensSold: sales }))
  ),

  getAllSales: () => (
    connection().then((db) => db.collection('sales').find().toArray())
  ),

};
