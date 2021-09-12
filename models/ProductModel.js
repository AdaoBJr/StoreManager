const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection()
  .then((db) => db.collection('products').find().toArray())
  .then((result) => result);

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const getProductId = await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));  

  if (!getProductId) return null;

  return getProductId;
};

const create = async (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then((result) => result.ops[0]);

const findName = async (name) => connection()
  .then((db) => db.collection('products').findOne({ name }))
  .then((result) => result);
  
const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection()
    .then((db) => 
      db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } })
      .then(() => ({ _id: id, name, quantity })));
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const excludeProduct = await connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

  if (!excludeProduct.deletedCount) return null;

  return excludeProduct;
};

module.exports = {
  getAll,
  findById,
  create,
  findName,
  update,
  exclude,
};