const { ObjectId } = require('mongodb');
const connection = require('./connection');

const productExists = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });

  return product !== null;
};

const getAll = async () => {
  const db = await connection();

  const products = await db.collection('products').find().toArray();

  return {
    products,
  };
};

const getById = async (id) => {
  const db = await connection();
  const product = await db.collection('products').findOne(ObjectId(id));

  if (!product) return null;

  const { name, quantity } = product;

  return {
    _id: ObjectId(id),
    name,
    quantity,
  };
};

const create = async ({ name, quantity }) => {
  const db = await connection();
  const createdProduct = await db.collection('products').insertOne({ name, quantity });

  return {
    _id: createdProduct.insertedId,
    name,
    quantity,
  };
};

const update = async ({ id, name, quantity }) => {
  const db = await connection();

  if (!ObjectId.isValid(id)) return null;

  const product = await db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

  return {
    _id: product.insertedId,
    name,
    quantity,
  };  
};

const exclude = async (id) => {
  const db = await connection();
  const response = await getById(id);
  
  if (!response) return null;

  await db.collection('products').deleteOne({ _id: ObjectId(id) });

  return response;
};

module.exports = {
  productExists,
  getAll,
  getById,
  create,
  update,
  exclude,
};