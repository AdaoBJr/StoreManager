const { ObjectId } = require('mongodb');
const connection = require('./connection');

const productExists = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });

  if (!product) throw new Error();

  return product;
};

const getAll = async () => {
  const db = await connection();
  return db.collection('products').find().toArray();
};

const getOne = async (id) => {
  const db = await connection();
  return db.collection('products').findOne({ _id: ObjectId(id) });
};

const createProduct = async ({ name, quantity }) => {
  const db = await connection();
  const createdProductResult = await db
    .collection('products')
    .insertOne({ name, quantity });

  return { _id: createdProductResult.insertedId, name, quantity };
};

const updateProduct = async ({ id, name, quantity }) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();

  await db
    .collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  return { _id: id, name, quantity };
};

const deleteProduct = async (id) => {
  const db = await connection();

  const product = await db
    .collection('products')
    .findOne({ _id: ObjectId(id) });

  if (product !== null) {
    const { _id, name, quantity } = await db
      .collection('products')
      .findOne({ _id: ObjectId(id) });

    await db.collection('products').deleteOne({ _id: ObjectId(id) });

    return { _id, name, quantity };
  }

  throw new Error('Product not found');
};

module.exports = {
  getAll,
  getOne,
  createProduct,
  updateProduct,
  deleteProduct,
  productExists,
};
