const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addProduct = async (name, quantity) => {
  const db = await connection();
  const newProduct = await db.collection('products')
    .insertOne({ name, quantity });

  return { _id: newProduct.insertedId, name, quantity };
};

const alreadyExists = async (name) => {
  const db = await connection();
  const repeated = await db.collection('products')
    .findOne({ name });

  return repeated !== null;
};

const getProducts = async () => {
  const db = await connection();
  return db.collection('products')
    .find()
    .toArray();
};

const idValid = async (id) => ObjectId.isValid(id);

const getProductById = async (id) => {
  const db = await connection();
  const product = await db.collection('products')
    .findOne(ObjectId(id));

  return product;
};

const changeProduct = async (id, name, quantity) => {
  const db = await connection();
  const product = await db.collection('products')
    .updateOne(
    { _id: ObjectId(id) },
    {
      $set: { name, quantity },
    },
  );

  return product;
};

const deleteProduct = async (id) => {
  const db = await connection();
  const { value } = await db.collection('products')
    .findOneAndDelete({
      _id: ObjectId(id),
    });
  
  return value;
};

const updateData = async (id, quantity) => {
  const db = await connection();
  await db.collection('products')
    .updateOne(
      { _id: ObjectId(id) },
      { $inc: { quantity } },
    );
};

module.exports = {
  addProduct,
  alreadyExists,
  getProducts,
  idValid,
  getProductById,
  changeProduct,
  deleteProduct,
  updateData,
};
