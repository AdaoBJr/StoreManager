const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collection = 'products';

const getAll = async () => (
  connection()
    .then((db) => db.collection(collection).find().toArray()));

const findByName = async (name) => (
  connection()
    .then((db) => db.collection(collection).findOne({ name })));

const findById = async (id) => (
  connection()
    .then((db) => db.collection(collection).findOne(new ObjectId(id))));

const create = async (name, quantity) => (
  connection()
    .then((db) => db.collection(collection).insertOne({ name, quantity })));

const update = async (id, name, quantity) => (
  connection()
    .then(
      (db) => db.collection(collection)
        .updateOne(
          { _id: ObjectId(id) }, { $set: { name, quantity } },
        ),
    ));

const remove = async (id) => (
  connection()
    .then((db) => db.collection(collection).deleteOne({ _id: ObjectId(id) })));

module.exports = { getAll, findByName, findById, create, update, remove };
