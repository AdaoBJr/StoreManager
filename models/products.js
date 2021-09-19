const { ObjectId } = require('mongodb');

const connection = require('./connection');

module.exports = {

  getAllProductsFromDB: async () => (
    connection().then((db) => db.collection('products').find({}).toArray())
  ),

  getProductByNameFromDB: async (name) => (
    connection().then((db) => db.collection('products').findOne({ name }))
  ),
    
  getProductByIdFromDB: async (id) => (
    connection().then((db) => db.collection('products').findOne({ _id: ObjectId(id) }))
  ),

  deleteProductByIdFromDB: async (id) => (
    connection().then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }))
  ),

  addProductToDB: async (product) => (
    connection().then((db) => db.collection('products').insertOne(product))
  ),

  deleteAllProductsFromDB: async () => (
    connection().then((db) => db.collection('products').deleteMany({}))
  ),

};
