const { ObjectId } = require('mongodb');

const connection = require('./connection');

const COLLECTION = 'products';

async function getAll() {
  const products = await connection().then((db) => db.collection(COLLECTION).find().toArray())
  .then((results) => (results.length > 0 ? results : ''));

  if (!products) {
    return { products };
  }
  
  return { products };
}

async function getById(id) {
  const product = await connection()
    .then((db) => db.collection(COLLECTION).findOne({ _id: ObjectId(id) }))
    .then((result) => (!result ? null : result));

  if (!product) {
    return { error: { code: 'not_found', message: 'No products found' } };
  }

  return { product };
}

async function create(name, quantity) {
  try {
    const newProduct = await connection()
      .then((db) => db.collection(COLLECTION).insertOne({ name, quantity, initialStock: quantity }))
      .then((result) => ({ _id: result.insertedId, name, quantity }));

      return newProduct;
  } catch (error) {
    console.error(error);
    return process.exit(1);
  }
}

async function update(id, name, quantity) {
  try {
    const updatedProduct = await connection()
      .then((db) => db.collection(COLLECTION).updateOne(
        { _id: ObjectId(id) },
        { $set: { name, quantity, initialStock: quantity } },
        { returnOriginal: false },
      ))
      .then((result) => (!!result.matchedCount));

    if (!updatedProduct) return { error: { code: 'not_found', message: 'No products found' } };

    return { _id: id, name, quantity };
  } catch (error) {
    console.error(error);
    return process.exit(1);
  }
}

async function obliterate(id) {
  try {
    const { error, product } = await getById(id);

    if (error) {
      return { error: { code: 'invalid_data', message: 'Wrong id format' } };
    }

    await connection()
      .then((db) => db.collection(COLLECTION).deleteOne({ _id: ObjectId(id) }));

    return { product };
  } catch (error) {
    console.error(error);
    return process.exit(1);
  }
}

module.exports = { create, getAll, getById, update, obliterate };
