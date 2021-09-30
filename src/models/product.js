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

const update = async (id, body) => {
  const db = await connection();

  const updatedProduct = await db.collection('products')
    .update({ _id: ObjectId(id) }, { $set: body });
    console.log(updatedProduct);

  return updatedProduct;
};

const remove = async (_id) => {
  const db = await connection();

  const deletedProduct = db.collection('products').delete();

  return deletedProduct;
};

module.exports = { getAll, getById, getByName, create, update, remove };
