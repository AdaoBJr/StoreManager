// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSale = (data) => 
  connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: data }))
  .then((result) => result.ops[0]);

module.exports = { 
  createSale,
};