const { ObjectId } = require('mongodb');
const mongoConnect = require('./connection');

const create = async ({ name, quantity }) => {
  const productsCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('products'));

  const { insertedId: id } = await productsCollection
    .insertOne({ name, quantity });

  return { id };
};

const findByName = async ({ name }) => {
  const productsCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('products'));

  const result = await productsCollection
    .findOne({ name }, { _id: 0, name: 1 });

  return !result;
};

const findById = async ({ id }) => {
  const productsCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('products'));      

  const product = await productsCollection
    .findOne(new ObjectId(id));
  
    return { product };
};

const getAll = async () => {
  const productsCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('products'));

  const products = await productsCollection
    .find().toArray();

  return { products };
};

module.exports = {
  create,
  findByName,
  getAll,
  findById,
};
