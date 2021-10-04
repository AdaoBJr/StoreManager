const { ObjectId } = require('mongodb');
const connection = require('./connection');

const PRODUCTS = 'products';

async function getAll() {
  return connection()
    .then((db) => db.collection(PRODUCTS).find({}).toArray());
}

async function getByName(name) {
  return connection()
    .then((db) => db.collection(PRODUCTS).findOne({ name }));
}

async function getById(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return connection()
    .then((db) => db.collection(PRODUCTS).findOne({ _id: ObjectId(id) }));
}

async function insertProduct(product) {
  return connection()
    .then((db) => db.collection(PRODUCTS).insertOne(product))
    .then((result) => getById(result.insertedId));
}

async function updateProduct(product, id) {
  return connection()
    .then((db) => db.collection(PRODUCTS).updateOne(
      { _id: ObjectId(id) },
      { 
        $set: {
          name: product.name,
          quantity: product.quantity,
        }
      }
    ));
};

module.exports = { 
  insertProduct,
  getByName,
  getById,
  getAll,
  updateProduct,
};
