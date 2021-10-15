const { ObjectId } = require('mongodb');

const connection = require('./connection');

const COLLECTION = 'products';

const addProduct = async (productData) => {
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
  const product = await productsCollection.findOne({ name });
  return product;
};

const getProducts = async () => {
  const product = {};

  const productsCollection = await connection().then((db) => db.collection(COLLECTION));

  product.products = await productsCollection.find({}).toArray();

  return product;
};

const getProductById = async (id) => {
  const productsCollection = await connection().then((db) => db.collection(COLLECTION));
  const product = await productsCollection.findOne({ _id: ObjectId(id) });
  return product;
};

const updateProduct = async (id, updatedProduct) => {
  const { name, quantity } = updatedProduct;

  const productsCollection = await connection().then((db) => db.collection(COLLECTION));

  const product = await productsCollection.updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity } },
  );

  return product;
};

const deleteProduct = async (id) => {
  const productsCollection = await connection().then((db) => db.collection(COLLECTION));
  const product = await productsCollection.deleteOne({ _id: ObjectId(id) });
  return product;
};

module.exports = {
  addProduct,
  getProducts,
  getProductByName,
  getProductById,
  updateProduct,
  deleteProduct,
};
