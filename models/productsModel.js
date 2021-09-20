const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = (product) => connection().then((db) =>
  db.collection('products').insertOne(product)).then(({ ops }) => ops[0]);

const getAll = () => connection().then((db) =>
  db.collection('products').find().toArray());

const getById = (id) => connection().then((db) =>
  db.collection('products').findOne(ObjectId(id)));

const findName = (name) => connection().then((db) =>
  db.collection('products').findOne({ name }));

  const update = (id, product) => connection().then((db) =>
  db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: product }));

const excluse = (id) => connection().then((db) =>
  db.collection('products').findOneAndDelete({ _id: ObjectId(id) }));

module.exports = {
  create,
  getAll,
  getById,
  findName,
  update,
  excluse,
};