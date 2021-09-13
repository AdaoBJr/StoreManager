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

module.exports = {
  create,
  getAll,
  getById,
  findByName,
};