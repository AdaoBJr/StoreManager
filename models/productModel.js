const { ObjectId } = require('mongodb');
const connection = require('./connection');

const newProduct = async ({ name, quantity }) => {
  const db = await connection();
  const produto = await db.collection('products').insertOne({ name, quantity });
  const { insertedId } = JSON.parse(produto);
  return { _id: insertedId, name, quantity };
};

const allProducts = async () => {
  const db = await connection();
  const product = await db.collection('products').find().toArray();
  return product;
};

const productById = async (id) => {
  const db = await connection();
  const product = await db.collection('products').findOne(ObjectId(id));

  if (product) {
    return { status: 200, product };
  }
  return {
    status: 422, err: { code: 'invalid_data', message: 'Wrong id format' } };
};

const updatedProduct = async ({ id, name, quantity }) => {
  const db = await connection();
  const product = await db.collection('products').updateOne({ _id: ObjectId(id) },
  { $set: { name, quantity } });

return product;
};

const deleteProduct = async ({ id }) => {
  const db = await connection();
  const produtos = await db.collection('products').deleteOne({ _id: ObjectId(id) });
  return produtos;
};

module.exports = { newProduct, allProducts, productById, updatedProduct, deleteProduct };
