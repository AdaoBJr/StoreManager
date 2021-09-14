const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const findByName = async (name) => {
  const db = await mongoConnection();
  const product = await db.collection('products').findOne({ name });
  return product;
};

const createProduct = async (name, quantity) => {
  const db = await mongoConnection();
  const { insertedId: id } = await db.collection('products')
  .insertOne({ name, quantity });
  return {
    _id: id,
    name,
    quantity,
  };
};

const getAllProducts = async () => {
  const db = await mongoConnection();
  const products = await db.collection('products').find().toArray();
  return products;
};

const getProductById = async (id) => {
  const db = await mongoConnection();
  const product = await db.collection('products').findOne(ObjectId(id));
  return product;
};

const updateProductById = async (id, name, quantity) => {
  const db = await mongoConnection();
  await db.collection('products')
    .updateOne(({ _id: ObjectId(id) }), { $set: { name, quantity } });
  return getProductById(id);
};

const deleteProductById = async (id) => {
  const db = await mongoConnection();
  const deletedProduct = await db.collection('products')
    .findOneAndDelete({ _id: ObjectId(id) });
  return deletedProduct.value;
};

const updateProductsDB = async (productId, quantity) => {
  const db = await mongoConnection();
  await db.collection('products')
  .updateOne({ _id: ObjectId(productId) }, { $inc: { quantity } });
};

module.exports = {
  findByName,
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  updateProductsDB,
};