const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const findByName = async (name) => {
  const productCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products').findOne({ name }));
  
  return productCollection;  
};

const create = async ({ name, quantity }) => {
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));

  const createdProduct = await productsCollection.insertOne({ name, quantity });
  return {
    id: createdProduct.insertedId,
    name,
    quantity,
  };
};

const getAll = async () => {
  const db = await mongoConnection.getConnection();
  const product = await db.collection('products')
    .find()
    .toArray();

  return product;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await mongoConnection.getConnection();
  const productId = await db.collection('people').findOne(ObjectId(id));
  return productId;
};

module.exports = {
  create,
  findByName,
  getAll,
  getById,
};