const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();
  return products;
};

const getById = async (id) => {
  const db = await connection();
  const products = await db.collection('products').findOne({ _id: ObjectId(id) });
  return products;
};

const getByName = async (name) => {
  const db = await connection();
  const products = await db.collection('products').findOne({
    name,
  });
  return products;
};

const createProduct = async (name, quantity) => {
  const db = await connection();
  const product = await db.collection('products').insertOne({
    name,
    quantity,
  });
  return product;
};

const deleteById = async (id) => {
  const db = await connection();
  const product = await db.collection('products').deleteOne({
    _id: ObjectId(id),
  });
  return product;
};

const editProduct = async (id, name, quantity) => {
  const db = await connection();
  await db.collection('products').updateOne({
    _id: ObjectId(id),
  },
  {
    $set: {
      name,
      quantity,
    },
  });
};

const decreaseProductQuantity = async (id, decreasedQuantity) => {
  const db = await connection();
  await db.collection('products').updateOne(
    {
      _id: ObjectId(id),
    },
    {
      $inc: {
        quantity: (decreasedQuantity * -1),
      },
    },
  );
};

const increaseProductQuantity = async (id, increasedQuantity) => {
  const db = await connection();
  await db.collection('products').updateOne(
    {
      _id: ObjectId(id),
    },
    {
      $inc: {
        quantity: increasedQuantity,
      },
    },
  );
};

module.exports = {
  getAll,
  getById,
  getByName,
  createProduct,
  deleteById,
  editProduct,
  decreaseProductQuantity,
  increaseProductQuantity,
};
