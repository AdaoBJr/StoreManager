const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findByName = async (name) => {
  const people = await connection().then((db) => db.collection('products'));

  const find = await people.findOne({ name });
  return find;
};

const create = async ({ name, quantity }) => {
  const data = await connection().then((db) => db.collection('products'));
  
  const newProduct = await data.insertOne({ name, quantity });
  return newProduct;
};

const getAll = async () => {
  const data = await connection().then((db) => db.collection('products'));

  const productsAll = await data.find().toArray();
  return productsAll;
};

const getById = async (id) => {
  const data = await connection().then((db) => db.collection('products'));

  const findById = await data.findOne({ _id: new ObjectId(id) });
  return findById;
};

const updateId = async (id, body) => {
  const data = await connection().then((db) => db.collection('products'));
  const obj = { _id: id, ...body };
  const update = await data.updateOne({ _id: id }, { $set: obj });
  return update;
};

const deleteId = async (id) => {
  const data = await connection().then((db) => db.collection('products'));
  const objDelete = await data.deleteOne({ _id: ObjectId(id) });
  return objDelete;
};

module.exports = {
  create,
  getAll,
  getById,
  updateId,
  deleteId,
  findByName,
};