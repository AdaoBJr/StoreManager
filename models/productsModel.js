const { ObjectId } = require('mongodb');
const connect = require('./connection');

const add = async (name, quantity) =>
  connect().then(async (db) => {
    const product = await db.collection('products').insertOne({ name, quantity });
    return product.ops[0];
  });

const findByName = async (name) =>
  connect().then(async (db) => {
    const product = await db.collection('products').findOne({ name });
    return product;
  });

const getAll = async () => 
  connect().then(async (db) => db.collection('products').find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const product = connect()
    .then(async (db) => db.collection('products').findOne(ObjectId(id)));
  return product;
};

const update = async (id, productForUpdate) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  
  return { _id: id, ...productForUpdate };
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const productRemove = connect()
    .then(async (db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
  return productRemove;
};

module.exports = { getAll, add, findByName, getById, update, remove };