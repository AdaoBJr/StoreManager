const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) => ({ products }));

const findById = async (id) => (
  ObjectId.isValid(id)
  ? connection()
  .then((db) => db.collection('products').findOne(new ObjectId(id)))
  : null
);

const create = async (name, quantity) =>
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => result.ops[0]);
  
const update = async (id, name, quantity) =>
  connection()
    .then((db) => db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }))
    .then(() => ({ _id: id, name, quantity }));
  
const remove = async (id) =>
  connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

const findByName = async (name) => connection()
    .then((db) => db.collection('products').findOne({ name }));

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
  findByName,
};