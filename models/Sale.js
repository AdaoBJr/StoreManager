const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection()
  .then((db) => db.collection('sales').find().toArray())
  .then((sales) => ({ sales }));

const findById = async (id) => (
  ObjectId.isValid(id)
  ? connection()
  .then((db) => db.collection('sales').findOne(new ObjectId(id)))
  : null
);

const create = async (sale) =>
  connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sale }))
    .then((result) => result.ops[0]);
  
const update = async (id, sale) =>
  connection()
    .then((db) => db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sale } }))
    .then(() => ({ _id: id, itensSold: sale }));
  
const remove = async (id) =>
  connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};