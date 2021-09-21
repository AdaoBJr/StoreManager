const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const db = await connection();
  const newProduct = await db.collection('products').insertOne({ name, quantity });

  return newProduct.ops[0];
};

const getAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();

  return products;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const product = await db.collection('products').findOne(ObjectId(id));

  if (!product) return null;

  return product;
};

const updateProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const updatedProduct = await db.collection('products')
    .UpdateOne(
      { _id: ObjectId(id) },
      { $set: { name, quantity } },
    );

  if (!updatedProduct) return null;

  return updatedProduct.value;
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const productDeleted = await getById(id);
  const db = await connection();
  await db.collection('products').deleteOne({ _id: ObjectId(id) });

  return productDeleted;
};

module.exports = {
  createProduct,
  getAll,
  getById,
  updateProduct,
  deleteProduct,
};
