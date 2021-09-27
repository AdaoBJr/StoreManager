const { ObjectId } = require('mongodb');

const connection = require('./connection');

const COLLECTION = 'sales';

async function getAll() {
  const sales = await connection().then((db) => db.collection(COLLECTION).find().toArray())
  .then((results) => (results.length > 0 ? results : ''));

  if (!sales) {
    return { sales };
  }
  
  return { sales };
}

async function getById(id) {
  const sale = await connection()
    .then((db) => db.collection(COLLECTION).findOne({ _id: ObjectId(id) }))
    .then((result) => (!result ? null : result));

  if (!sale) {
    return { error: { code: 'not_found', message: 'No sales found' } };
  }

  return { sale };
}

async function create(productId, quantity) {
  try {
    const newData = { itensSold: [
      { productId, quantity },
    ] };

    const newSale = await connection()
      .then((db) => db.collection(COLLECTION).insertOne(newData))
      .then((result) => ({ _id: result.insertedId, itensSold: [{ productId, quantity }] }));

      return newSale;
  } catch (error) {
    console.error(error);
    return process.exit(1);
  }
}

async function update(id, productId, quantity) {
  try {
    const updatedSale = await connection()
      .then((db) => db.collection(COLLECTION).updateOne(
        { _id: ObjectId(id) },
        { $set: { productId, quantity } },
        { returnOriginal: false },
      ))
      .then((result) => (!!result.matchedCount));

    if (!updatedSale) return { error: { code: 'not_found', message: 'No sales found' } };

    return { _id: id, productId, quantity };
  } catch (error) {
    console.error(error);
    return process.exit(1);
  }
}

async function obliterate(id) {
  try {
    const { error, sale } = await getById(id);

    if (error) {
      return { error: { code: 'invalid_data', message: 'Wrong id format' } };
    }

    await connection()
      .then((db) => db.collection(COLLECTION).deleteOne({ _id: ObjectId(id) }));

    return { sale };
  } catch (error) {
    console.error(error);
    return process.exit(1);
  }
}

module.exports = { create, getAll, getById, update, obliterate };
