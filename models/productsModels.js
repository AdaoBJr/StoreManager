const { ObjectId } = require('mongodb');
const connection = require('./connection');

const isExist = async ({ name }) => {
  const productsCollection = await connection();
  const products = await productsCollection.collection('products');
  const query = { name };
  
  const result = await products.findOne(query);
  return result;
};

const create = async ({ name, quantity }) => {
  const productsCollection = await connection();
  const products = productsCollection.collection('products');

  const { insertedId: id } = await products.insertOne({ name, quantity });

  return {
    id,
    name,
    quantity,
  };
};

const getAll = async () => {
  const productsCollection = await connection();
  const products = await productsCollection.collection('products');
  
  const result = await products.find().toArray();

  return result;
};

const getById = async ({ id }) => {
  const productsCollection = await connection();
  const products = await productsCollection.collection('products');

  const query = { _id: ObjectId(id) };

  const result = await products.findOne(query);

  return result;
};

module.exports = {
  create,
  isExist,
  getAll,
  getById,
};
