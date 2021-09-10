const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collection = 'sales';

const getAll = () => (
  connection()
    .then((db) => db.collection(collection).find().toArray()));

const findByName = (name) => (
  connection()
    .then((db) => db.collection(collection).findOne({ name })));

const findById = (id) => (
  connection()
    .then((db) => db.collection(collection).findOne(new ObjectId(id))));

const create = (itensSold) => (
  connection()
    .then((db) => db.collection(collection).insertOne({ itensSold })));

const update = (id, itensSold) => (
  connection()
    .then((db) => db.collection(collection).updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold } },
    )));

const remove = (id) => (
  connection()
    .then((db) => db.collection(collection).deleteOne({ _id: ObjectId(id) })));
module.exports = {
  getAll,
  findByName,
  findById,
  create,
  update,
  remove,
};
