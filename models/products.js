const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (product) => {
  const db = await connection();
  const newProduct = db.collection('products').insertOne(product);
  return { _id: newProduct.insertedId, ...product };
};

const getAll = async () => {
  const db = await connection();
  const allProducts = await db.collection('products').find().toArray();
  return allProducts;
};

const getByName = async (name) => {
  const db = await connection();
  const foundProduct = await db.collection('products').findOne({ name });
  if (!foundProduct) return false;
  return true;
};

const getById = async (id) => {
  const db = await connection();
  return db.collection('products').findOne(ObjectId(id));
};

const update = async (id, updates) => {
  const db = await connection();
  const { matchedCount } = await db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: updates });
  if (matchedCount) {
    const product = await getById(id);
    return product;
  }
};

module.exports = {
  create,
  getByName,
  getAll,
  getById,
  update,
};
