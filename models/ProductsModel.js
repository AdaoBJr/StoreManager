const { ObjectId } = require('mongodb');

const connection = require('./connection');

const COLLECTION = 'products';

async function getAll() {
  const products = await connection().then((db) => db.collection(COLLECTION).find().toArray())
  .then((results) => (results.length > 0 ? results : null));

  if (!products) {
    return { error: { code: 'not_found', message: 'No products found' } };
  }
  
  const data = { products };
  
  return data;
}

async function getById(id) {
  const product = await connection()
    .then((db) => db.collection(COLLECTION).findOne({ _id: ObjectId(id) }))
    .then((result) => (!result ? null : result));

  if (!product) {
    return { error: { code: 'not_found', messagem: 'No products found' } };
  }

  const data = { product };

  return data;
}

async function create(name, quantity) {
  try {
    const newProduct = await connection()
      .then((db) => db.collection(COLLECTION).insertOne({ name, quantity }))
      .then((result) => ({ _id: result.insertedId, name, quantity }));

      return newProduct;
  } catch (error) {
    console.error(error);
    return process.exit(1);
  }
}

module.exports = { create, getAll, getById };
