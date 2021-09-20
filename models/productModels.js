const { ObjectId } = require('mongodb');
const connection = require('./connection');

async function findProduct(product) {
  const { name } = product;
  const db = await connection();
  const result = await db.collection('products').findOne({ name });
  return result;
}

async function saveProduct({ name, quantity }) {
  const db = await connection();
  const result = await db.collection('products').insertOne({ name, quantity });
  return {
    _id: result.insertedId,
    name,
    quantity,
  };
}

async function listProducts() {
  const db = await connection();
  const results = await db.collection('products').find();
  return {
    products: await results.toArray(),
  };
}

async function listProductById(id) {
  const products = await connection().then((db) => db.collection('products'));
  const result = await products.findOne({ _id: ObjectId(id) });
  return result;
}

async function editProduct(id, item) {
  const { name, quantity } = item;
  const collection = await connection().then((db) => db.collection('products'));

  const editedProduct = await collection.updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity } },
  );

  return editedProduct;
}

module.exports = {
  saveProduct,
  findProduct,
  listProducts,
  listProductById,
  editProduct,
};
