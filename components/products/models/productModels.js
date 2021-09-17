// parte que é responsavel por buscar, inserir, atualizar e deletar os dados CRUD
const { ObjectId } = require('mongodb');
const connection = require('./mongoDBConnection');

const getAll = async () =>
  connection()
    .then((db) => db
      .collection('products')
      .find()
      .toArray())
    .catch((err) => err);

const add = async (name, qty) =>
  connection()
    .then((db) => db
      .collection('products'))
      .insertOne({ name, qty })
    .then((result) => {
      const obj = { id: result.insertedId, name, qty };

      return obj;
    });

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
};

const update = async (id, name, qty) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db
      .collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, qty } })
      .then(() => ({ _id: id, name, qty })));
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db
      .collection('products')
      .deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAll,
  add,
  getById,
  update,
  exclude,
};
