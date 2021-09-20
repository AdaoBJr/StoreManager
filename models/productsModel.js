const { ObjectId } = require('mongodb');
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

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const product = connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));

  return product;
};

const updateProduct = async (id, name, quantity) => {
  connection()
    .then((db) => db.collection('products').updateOne(
      { _id: ObjectId(id) },
      { $set: {
        name,
        quantity,
      } },
    ));

  return { _id: id, name, quantity };
};

const deleteProduct = async (id) => 
  connection()
    .then((db) => db.collection('products').deleteOne(
      { _id: ObjectId(id) },
    ));

module.exports = {
  createProduct,
  findByName,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};