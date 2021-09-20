const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

// req 1
const createProduct = async ({ name, quantity }) => {
  const db = await connection();
  const { insertedId: id } = await db.collection('products').insertOne({ name, quantity });
  return { id, name, quantity };
};

// req 1
const findProductByName = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });
  return product;
};

// req 2
const findProductById = async (id) => {
  const db = await connection();
  const productById = await db.collection('products').findOne(ObjectId(id));
  return productById;
};

// req 2
const findAllProducts = async () => {
  const db = await connection();
  const allProducts = await db.collection('products').find().toArray();
  return allProducts;
};

// req 3
const updateProduct = async ({ id, name, quantity }) => {
  const db = await connection();
  await db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  return { _id: id, name, quantity };
};

// req 4
const delProduct = async (id) => {
  const db = await connection();
  const deletedProduct = await db.collection('products').deleteOne({ _id: ObjectId(id) });
  const { name, quantity } = deletedProduct;
  return { _id: id, name, quantity };
};

module.exports = {
  createProduct,
  findProductByName,
  findProductById,
  findAllProducts,
  updateProduct,
  delProduct,
};
