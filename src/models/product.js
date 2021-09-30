const { ObjectId } = require('mongodb');
const connection = require('../../connection');

const getAll = async () => {
  const db = await connection();

  const products = await db.collection('products').find().toArray();

  return products;
};

const getById = async (id) => {
  const db = await connection();

  const product = await db.collection('products').findOne({ _id: ObjectId(id) });

  if (!product) return null;

  return product;
};

const getByName = async (name) => {
  const db = await connection();

  const product = db.collection('products').findOne({ name });

  return product;
};

const create = async (product) => {
  const db = await connection();

  const newProduct = await db.collection('products').insertOne(product);

  return newProduct.ops[0];
};

const update = async (id, name, quantity) => {
  const db = await connection();

  const updatedProduct = await db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

  return updatedProduct;
};

const remove = async (id) => {
  const db = await connection();

  if (!ObjectId(id)) return null;

  const deletedProduct = await db.collection('products').deleteOne({ _id: ObjectId(id) });

  return deletedProduct;
};

module.exports = { getAll, getById, getByName, create, update, remove };
