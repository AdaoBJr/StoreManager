const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, quantity) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const response = await productsCollection
    .insertOne({ name, quantity });

  return {
    _id: response.insertedId,
    name,
    quantity,
  };
};

const findByName = async (name) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const result = await productsCollection.findOne({ name });
  return result;
};

const getAll = async () => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const products = await productsCollection.find().toArray();
  return { products };
};

const getById = async (id) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const response = await productsCollection.findOne(new ObjectId(id));
  return response;
};

module.exports = {
  create,
  findByName,
  getAll,
  getById,
};
