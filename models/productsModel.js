const connection = require('./connection');

const findByName = async (name) => 
  connection()
    .then((db) => db.collection('products').findOne({ name }));

const createProduct = async (name, quantity) => 
  connection()
    .then((db) => db.collection('products').insertOne({
      name,
      quantity,
    }));

const getAllProducts = async () => 
  connection()
    .then((db) => db.collection('products').find().toArray());

module.exports = {
  createProduct,
  findByName,
  getAllProducts,
};