const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllProducts = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();
  return products;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const productId = await db.collection('products').findOne(new ObjectId(id));
  if (!productId) return null;
  return productId;
};

const findName = async (name) => {
  const db = await connection();
  const nameProduct = await db.collection('products').findOne({ name });
  return nameProduct;
};

const createProducts = async (name, quantity) => {
  const db = await connection();
  const addProduct = await db.collection('products').insertOne({ name, quantity });
  return { _id: addProduct.insertedId, name, quantity };
};
const updateProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const productUpdate = await db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  return { _id: productUpdate.insertedId, name, quantity };
};

const excludeProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const productDelete = await db.collection('products').deleteOne({ _id: ObjectId(id) });
  return productDelete;
};

module.exports = {
  findName,
  createProducts,
  getAllProducts,
  findById,
  updateProduct,
  excludeProduct,
};