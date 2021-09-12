// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (arr) => connection()
.then((db) => db.collection('sales').insertOne({ itensSold: arr }))
.then((result) => result.ops[0]);

module.exports = {
  create,
};