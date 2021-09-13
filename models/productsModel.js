const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findByName = async (name) => { 
  const find = await connection().then((db) => db.collection('products').findOne({ name }));
  return find;
};
const addProducts = async (name, quantity) => {
  const add = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return add;
};

const findAll = async () => {
  const find = await connection().then((db) => db.collection('products').find().toArray());
  return find;
};

const findById = async (id) => ObjectId.isValid(id)
  && connection().then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));

module.exports = {
    findByName,
    addProducts,
    findAll,
    findById,
};