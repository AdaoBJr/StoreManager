const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = (itensSold) => connection().then((db) =>
  db.collection('sales').insertOne({ itensSold })).then(({ ops }) => ops[0]);

const getAll = () => connection().then((db) =>
  db.collection('sales').find().toArray());

const getById = (id) => connection().then((db) =>
  db.collection('sales').findOne(ObjectId(id)));

const update = (id, itensSold) => connection().then((db) =>
  db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }));

const excluse = (id) => connection().then((db) =>
  db.collection('sales').findOneAndDelete({ _id: ObjectId(id) }));

const updateStock = (id, quantity) => connection().then((db) =>
  db.collection('products').updateOne({ _id: ObjectId(id) }, { $inc: { quantity } }));

module.exports = {
  create,
  getAll,
  getById,
  update,
  excluse,
  updateStock,
};