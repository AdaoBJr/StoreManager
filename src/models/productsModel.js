const { ObjectId } = require('mongodb');
const productsConnection = require('./productsConnection');

const getAllProducts = async () => productsConnection()
  .then((db) => db.collection('products').find().toArray());

const addProduct = async (name, quantity) => productsConnection()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then((result) => ({ _id: result.insertedId, name, quantity }));

const getProductById = async (id) => productsConnection()
  .then((db) => db.collection('products').findOne(ObjectId(id)));

const checkName = async (name) => productsConnection()
  .then((db) => db.collection('products').findOne({ name }));

module.exports = { addProduct, checkName, getAllProducts, getProductById };
