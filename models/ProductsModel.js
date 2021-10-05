const { ObjectId } = require('mongodb');
const connection = require('./connection');

const storeProduct = async (data) => {
  const { name, quantity } = data;

  const productsResult = await connection().then((db) => db.collection('products'));

  const { insertedId: _id } = await productsResult.insertOne({
    name,
    quantity,
  });

  return { _id, name, quantity };
};

const getAllProducts = async () => {
  const allProducts = await connection()
    .then((db) => db.collection('products').find().toArray());

  return allProducts;
};

const getProductByName = async (name) => {
  const productsResult = await connection().then((db) => db.collection('products'));
  const result = await productsResult.findOne({ name });
  return result;
};

const getProductsById = async (id) => {
  const productsResult = await connection().then((db) => db.collection('products'));
  const result = await productsResult.findOne({ _id: ObjectId(id) });
  return result;
};

const updatedProduct = async (id, name, quantity) => {
  connection()
    .then((db) => db.collection('products')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { name, quantity } },
      ));
};

const deleteProduct = async (id) => {
  const product = await connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

  return product;
};

module.exports = {
  storeProduct,
  getAllProducts,
  getProductByName,
  getProductsById,
  updatedProduct,
  deleteProduct,
};