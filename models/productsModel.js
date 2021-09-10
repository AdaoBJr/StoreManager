const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findProductByName = (name) => {
  connection().collection('products').findOne({ name });
};

const createProduct = ({ name, quantity }) => 
connection().collection('products').insertOne({ name, quantity })
  .then((result) => result.ops[0]);

module.exports = { 
  findProductByName,
  createProduct,
};