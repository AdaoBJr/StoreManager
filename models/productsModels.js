const mongoConnection = require('./connection');

const create = async ({ name, quantity }) => {
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));

  const { insertedId: _id } = await productsCollection
    .insertOne({ name, quantity });

  return {
    _id,
    name,
    quantity,
  };
};

const findName = async ({ name }) => {
  const productsCollections = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));

  const product = await productsCollections.findOne({ name });

  return product;
};

const findAll = async () => {
  const productsColletion = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));

  const products = await productsColletion.find().toArray();
  
  return products;
};

module.exports = { create, findName, findAll };