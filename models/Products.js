const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllProducts = async () => {
  const db = await connection();

  return db.collection('products').find().toArray();
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();

  return db.collection('products').findOne(ObjectId(id));
};

const updateProductById = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();

  await db.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity } },
  );

  return {
    _id: id,
    name,
    quantity,
  };
};

const newProduct = async (name, quantity) => {
  const db = await connection();
  const product = await db.collection('products').insertOne({ name, quantity });
  const { insertedId } = JSON.parse(product);
  return {
    _id: insertedId,
    name,
    quantity,
  };
};

const productExists = async (name) => {
  const db = await connection();
  let product = null;

  product = await db.collection('products').findOne({ name });

  if (product) {
    return true;
  }
};

const deleteProductById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();

  const { _id, name, quantity } = await db.collection('products').findOne(ObjectId(id));

  await db.collection('products').deleteOne({ _id: ObjectId(id) });

  return { _id, name, quantity };
};

module.exports = {
  newProduct,
  productExists,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};