const { ObjectId } = require('mongodb');
const connection = require('./mongoConnection');

const newProduct = async ({ name, quantity }) => {
  const db = await connection();
  const produto = await db.collection('products').insertOne({ name, quantity });
  const { insertedId } = JSON.parse(produto);
  return { _id: insertedId, name, quantity };
};

const listProducts = async () => {
  const db = await connection();
  const produtos = await db.collection('products').find().toArray();
  return produtos;
};

const deleteProduct = async ({ id }) => {
  const db = await connection();
  const produtos = await db.collection('products').deleteOne({ _id: ObjectId(id) });
  return produtos;
};

const listById = async (id) => {
  const db = await connection();
  const produto = await db.collection('products').findOne(ObjectId(id));

  if (produto) {
    return { status: 200, produto };
  }
  return {
    status: 422, err: { code: 'invalid_data', message: 'Wrong id format' } };
};

const updateProduct = async ({ id, name, quantity }) => {
  const db = await connection();
  const produto = await db.collection('products').updateOne({ _id: ObjectId(id) },
    { $set: { name, quantity } });

  return produto;
};

module.exports = { newProduct, listProducts, listById, updateProduct, deleteProduct };
