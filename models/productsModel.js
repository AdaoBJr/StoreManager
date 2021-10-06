const { ObjectId } = require('mongodb');
const connection = require('./connection');


const getAll = async () => connection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) => ({ products }));

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const productData = await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));

  if (!productData) return null;

  return productData;
};

const create = async (name, quantity) => {
  const db = await connection();
  const product = await db.collection('products')
    .insertOne({ name, quantity });
    return { _id: product.insertedId, name, quantity };
};

const update = async (_id, name, quantity) => {
  const db = await connection();
  await db.collection('products')
    .updateOne({ _id: new ObjectId(_id) }, { $set: { name, quantity } });

      return { _id, name, quantity }; 
};

const deleteOne = async (id) => {
  const db = await connection();
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
};

const findByName = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ name }));

  if (!product) return null;

  return (product);
};

module.exports = {
  getAll,
  getById,
  create,
  findByName,
  update,
  deleteOne,
};
