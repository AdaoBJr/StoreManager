const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllProducts = async () => connection()
  .then((db) => db.collection('products').find().toArray());

const addProduct = async (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then((result) => ({ _id: result.insertedId, name, quantity }));

const getProductById = async (id) => connection()
  .then((db) => db.collection('products').findOne(ObjectId(id)));

const updateProductById = async (id, name, quantity) => connection()
  .then((db) => db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }))
      .then(() => ({ _id: id, name, quantity }));

const deleteProductById = async (id) => connection()
  .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

const checkName = async (name) => connection()
  .then((db) => db.collection('products').findOne({ name }));

module.exports = {
  addProduct, checkName, getAllProducts, getProductById, updateProductById, deleteProductById };
