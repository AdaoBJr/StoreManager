const connection = require('./connection');

const { ObjectId } = require('mongodb');

const COLLECTION = 'products';

const storeProduct = async (productData) => {
  const { name, quantity } = productData;

  const productsCollection = await connection().then((db) => db.collection(COLLECTION));

  const { insertedId: _id } = await productsCollection.insertOne({
    name,
    quantity,
  });

  return { _id, name, quantity };
};

const getProductByName = async (name) => {
  const productsCollection = await connection().then((db) => db.collection(COLLECTION));

  return await productsCollection.findOne({ name });
};

const getAllProducts = async () => {
  const product = {};

  const productsCollection = await connection().then((db) => db.collection(COLLECTION));

  product.products = await productsCollection.find({}).toArray();

  return product;
};

const getProductsById = async (id) => {
  const productsCollection = await connection().then((db) => db.collection(COLLECTION));

  return await productsCollection.findOne({ _id: ObjectId(id) });
};

const updatedProduct = async (id, updatedProduct) => {
  const { name, quantity } = updatedProduct;

  const productsCollection = await connection().then((db) => db.collection(COLLECTION));

  return await productsCollection.updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity} },
  );
};

const deleteProduct = async (id) => {
  const productsCollection = await connection().then((db) => db.collection(COLLECTION));

  return await productsCollection.deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  storeProduct,
  getAllProducts,
  getProductByName,
  getProductsById,
  updatedProduct,
  deleteProduct,
};